import type { UsePrepareContractWriteConfig } from 'wagmi';
import type { MissingOffchainDataError } from './types/errors';
import type { ComposooorQueryParams, ComposooorApiResponse } from './api/api.interface';
import type { PrefixedBy0x } from './types/common';
import type { BigNumber } from 'ethers';

import { useEffect, useState } from 'react';
import { useProvider, useContractWrite } from 'wagmi';
import { Contract, utils } from 'ethers';

import { abi as scWalletAbi } from './abi/smartContractWallet.abi';
import { useAsync } from './hooks/useAsync';
import { useAxiosGet } from './hooks/useAxios';

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
  UsePrepareContractWriteConfig & { scWalletAddr: PrefixedBy0x };

export type UseComposooorResult = ReturnType<typeof useContractWrite>;

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
export function useComposooor(config: UseComposooorConfig): UseComposooorResult {
  const iface = new utils.Interface(config.abi as utils.Fragment[]);
  const [data, setData] = useState<PrefixedBy0x>();
  // const [contractWriteResult, setContractWriteResult] = useState<UseComposooorResult>();
  const [missingOffchainDataError, setMissingOffchainDataError] = useState<MissingOffchainDataError>();

  const provider = useProvider({ chainId: config.chainId });

  console.log('useComposooor');

  const [calls, setCalls] = useState<Call[]>([
    {
      callee: config.address,
      functionSelector: iface.getSighash(config.functionName) as PrefixedBy0x,
      data: `0x${iface.encodeFunctionData(config.functionName, config.args).slice(10)}`,
    },
  ]);

  const { error: simulationError } = useAsync<BigNumber, RevertMessage>(async () => {
    console.log('estimateGas', calls);
    const scWalletContract = new Contract(config.scWalletAddr, scWalletAbi, provider);

    return scWalletContract.estimateGas.execute(calls);
  }, [provider]);

  useEffect(() => {
    if (simulationError === undefined) {
      return;
    }

    const error: MissingOffchainDataError = decodeRevertMessage(simulationError);

    setMissingOffchainDataError(error);

    const { data: responseDate } = useAxiosGet<ComposooorQueryParams, ComposooorApiResponse>(error.url, {
      params: {
        args: error.abiArgs,
      },
    });

    setData(responseDate?.data);
  }, [simulationError]);

  useEffect(() => {
    if (data === undefined || missingOffchainDataError === undefined) {
      return;
    }

    const callToRegisterData: Call = {
      callee: missingOffchainDataError.registryAddress,
      functionSelector: utils.id('recordParameter(bytes)').slice(0, 10) as PrefixedBy0x,
      data: utils.defaultAbiCoder.encode(['bytes'], [data]) as PrefixedBy0x,
    };

    setCalls((previousCalls: Call[]) => [callToRegisterData, ...previousCalls]);
  }, [data, missingOffchainDataError]);

  return useContractWrite({
    mode: 'recklesslyUnprepared',
    abi: scWalletAbi,
    address: config.scWalletAddr,
    functionName: 'execute',
    args: [calls],
  });
}

/**
 * decodeRevertMessage
 *
 * Example:
 * `Error: VM Exception while processing transaction: reverted with custom error 'MissingOffchainDataError("0x42Cc87749B4031c53181692c537622e5c3b7d061", "https://composooor.com/api", "0x1234")'`
 */
function decodeRevertMessage(error: RevertMessage): MissingOffchainDataError {
  console.log(error);
  if (error.reason.match('MissingOffchainDataError') === null) {
    throw new Error(`Unkown error: ${error.reason}`);
  }

  const [url, abiArgs, registryAddress]: string[] = error.reason
    .split('MissingOffchainDataError("')[1]
    .split('")')[0]
    .split('", "');

  return { url, abiArgs, registryAddress } as MissingOffchainDataError;
}
