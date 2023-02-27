import type { UseContractWriteConfig, UsePrepareContractWriteConfig } from 'wagmi';
import type { MissingOffchainDataError } from './errors';
import type { ComposooorQueryParams, ComposooorApiResponse } from './api/api.interface';
import type { PrefixedBy0x } from './common';

import { useProvider, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { Contract, utils } from 'ethers';
import axios from 'axios';

import { ComposooorRegister__factory } from '../../../../example/contract/out/types/factories/contracts/ComposooorRegister__factory';

import { abi as scWalletAbi } from './abi/SmartContractWallet__factory';

/**
 * Call
 */
interface Call {
  callee: PrefixedBy0x;
  functionSelector: PrefixedBy0x;
  data: PrefixedBy0x;
}

/**
 * UseComposooorConfig
 */
export type UseComposooorConfig = Required<
  Pick<UsePrepareContractWriteConfig, 'abi' | 'address' | 'args' | 'functionName'>
> &
  UsePrepareContractWriteConfig & { scWalletAddr: string };

/**
 *
 * @param config
 * @returns
 */
interface RevertMessage {
  reason: string;
}

/**
 * useComposooor
 */
export async function useComposooor(config: UseComposooorConfig): Promise<ReturnType<typeof useContractWrite>> {
  const provider = useProvider({ chainId: config.chainId });
  const scWalletContract = new Contract(config.scWalletAddr, scWalletAbi, provider);
  const iface = new utils.Interface(config.abi as utils.Fragment[]);

  const calls: Call[] = [
    {
      callee: config.address,
      functionSelector: iface.getSighash(config.functionName) as PrefixedBy0x,
      data: iface.encodeFunctionData(config.functionName, config.args) as PrefixedBy0x,
    },
  ];

  try {
    await scWalletContract.estimateGas.execute(calls);
  } catch (e) {
    const { url, abiArgs, registryAddress } = decodeRevertMessage((e as RevertMessage).reason);

    console.log(url, abiArgs, registryAddress);

    const abiEncodedParams: ComposooorApiResponse = await axios.get<ComposooorQueryParams, ComposooorApiResponse>(url, {
      params: {
        args: abiArgs,
      },
    });

    // Add the call to the registry at the beginning of the calls array
    calls.unshift({
      callee: registryAddress,
      functionSelector: ComposooorRegister__factory.createInterface().getSighash(
        'recordParameter(bytes)',
      ) as PrefixedBy0x,
      data: utils.defaultAbiCoder.encode(['bytes'], [abiEncodedParams.data]) as PrefixedBy0x,
    });
  }

  const { config: prepareConfig } = usePrepareContractWrite({
    abi: scWalletAbi,
    address: config.scWalletAddr as PrefixedBy0x,
    functionName: 'execute',
    args: [calls],
  });

  return useContractWrite(prepareConfig as UseContractWriteConfig);
}

/**
 * decodeRevertMessage
 *
 * Example:
 * `Error: VM Exception while processing transaction: reverted with custom error 'MissingOffchainDataError("0x42Cc87749B4031c53181692c537622e5c3b7d061", "https://composooor.com/api", "0x1234")'`
 */
function decodeRevertMessage(message: string): MissingOffchainDataError {
  const [url, abiArgs, registryAddress]: string[] = message
    .split('MissingOffchainDataError("')[1]
    .split(')')[0]
    .split('", "');

  return { url, abiArgs, registryAddress } as MissingOffchainDataError;
}
