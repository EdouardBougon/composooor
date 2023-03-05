import type { UsePrepareContractWriteConfig } from 'wagmi';
import type { MissingOffchainDataError } from './types/errors';
import type { ComposooorQueryParams, ComposooorApiResponse } from './api/api.interface';
import type { PrefixedBy0x } from './types/common';
import type { AxiosResponse } from 'axios';

import { defaultAbiCoder } from 'ethers/lib/utils.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useProvider, useContractWrite, useAccount } from 'wagmi';
import { Contract, utils } from 'ethers';

import { abi as scWalletAbi } from './abi/smartContractWallet.abi';
import { useAsync } from './hooks/useAsync';


const sleep = (timeoutInMs: number) => new Promise(
  (resolve: (reseon?: any) => void) => setTimeout(() => resolve(), timeoutInMs)
);


/**
 * Call
 */
interface Call {
  verboseName: string;
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
  UsePrepareContractWriteConfig & { scWalletAddr: PrefixedBy0x, addLog: (log: string) => void, resetLogs: () => void };

export type UseComposooorResult = ReturnType<typeof useContractWrite> & {
  isPrepareError: boolean;
  prepareError?: Error;
};

/**
 * useComposooor
 */
export function useComposooor(config: UseComposooorConfig): UseComposooorResult {
  const iface = new utils.Interface(config.abi as utils.Fragment[]);
  const [prepareError, setPrepareError] = useState<Error>();
  const provider = useProvider({ chainId: config.chainId });
  const { address } = useAccount();
  const [calls, setCalls] = useState<Call[]>([{
    verboseName: config.functionName,
    callee: config.address,
    functionSelector: iface.getSighash(config.functionName) as PrefixedBy0x,
    data: `0x${iface.encodeFunctionData(config.functionName, config.args).slice(10)}`,
  }]);

  const addLog = config.addLog;
  const resetLogs = config.resetLogs;

  useEffect(
    () => {
      resetLogs();
    },
    [provider]
  )

  useAsync(async () => {
    const scWalletContract = new Contract(config.scWalletAddr, scWalletAbi, provider).connect(address as string);

    try {
      await sleep(1000); // add latency
      addLog(`Preparing transaction: ${calls.map((call: Call) => call.verboseName).join(', ')}`);
      await sleep(1000); // add latency

      await scWalletContract.estimateGas.execute(calls);
      addLog("Transaction prepared with success");
    } catch (e) {
      addLog("Error while preparing transaction");
      const error: Error | MissingOffchainDataError = decodeRevertMessage(e as Error);

      if (error instanceof Error) {
        addLog("Unknown error");
        setPrepareError(error);

        return;
      }

      addLog("Missing offchain data error");
      addLog(`Requesting data to ${error.url}`);
      const { data: responseData } = await axios.get<ComposooorQueryParams, AxiosResponse<ComposooorApiResponse>>(
        error.url,
        {
          params: {
            args: error.abiArgs,
          },
        },
      );
      await sleep(1500); // add latency

      addLog(`Offchain data received`);
      const callToRegisterData: Call = {
        verboseName: 'recordParameter',
        callee: error.registryAddress,
        functionSelector: utils.id('recordParameter(bytes)').slice(0, 10) as PrefixedBy0x,
        data: utils.defaultAbiCoder.encode(['bytes'], [responseData.data]) as PrefixedBy0x,
      };
      addLog(`Updating transaction to register the new data`);

      setCalls(() => [callToRegisterData, ...calls]);
    }
  }, [provider, calls]);

  const writeResult = useContractWrite({
    mode: 'recklesslyUnprepared',
    abi: scWalletAbi,
    address: config.scWalletAddr,
    functionName: 'execute',
    args: [calls],
  });

  return { ...writeResult, prepareError, isPrepareError: prepareError !== undefined };
}

/**
 * decodeRevertMessage
 *
 * Example:
 * `Error: VM Exception while processing transaction: reverted with custom error 'MissingOffchainDataError("0x42Cc87749B4031c53181692c537622e5c3b7d061", "https://composooor.com/api", "0x1234")'`
 */
function decodeRevertMessage(error: Error): Error | MissingOffchainDataError {
  const abiCoder = defaultAbiCoder;
  const missingDataSigHash = '0xab3e92cf';
  const errorHex = extractErrorHex(error.message);
  const foundSelector = errorHex.slice(0, 10);
  const abiEncodedErrorData = '0x'.concat(errorHex.substring(10));

  if (foundSelector === missingDataSigHash) {
    const decoded = abiCoder.decode(['address', 'string', 'bytes'], abiEncodedErrorData);

    return {
      registryAddress: decoded[0],
      url: decoded[1],
      abiArgs: decoded[2],
    };
  } else {
    console.log(error);
  }

  return error;
}

/**
 * extractErrorHex
 */
function extractErrorHex(message: string): string {
  let str = '0x';

  if (message) {
    const match = message.match(/error=(.*)/g);

    if (match) {
      str = match[0];
      if (str.match(/"data":(.*)"/g)) {
        str = (str.match(/"data":(.*)"/g) as string[])[0];
        str = (str.match(/0x[0-9a-f]*/g) as string[])[0];
      }
    }
  }

  return str;
}
