import type { MissingOffchainDataError } from './types/errors';
import type { PrefixedBy0x } from './types/common';
import type { Call, OnComposooorRpcRequestArgs, ComposooorMethodParams } from './types/snap';
import type { OnRpcRequestHandler } from '@metamask/snaps-types';

import { utils, providers, Contract } from 'ethers';
import { defaultAbiCoder } from 'ethers/lib/utils';

import { abi as scWalletAbi } from './abi/smartContractWallet.abi';

/**
 * Proxy used on each RPC request
 */
export async function onRpcRequest({ request }: OnComposooorRpcRequestArgs): ReturnType<OnRpcRequestHandler> {
  if (request.method !== 'composooor') {
    console.log(`Method ${request.method} not found`);

    return;
  }
  const provider = new providers.JsonRpcProvider();

  const config: ComposooorMethodParams = request.params;
  const iface = new utils.Interface(config.abi);

  await ethereum.request({
    method: 'eth_requestAccounts',
  });

  let calls: Call[] = [
    {
      callee: config.address,
      functionSelector: iface.getSighash(config.functionName) as PrefixedBy0x,
      data: `0x${iface.encodeFunctionData(config.functionName, config.args).slice(10)}`,
    },
  ];

  const scWalletContract = new Contract(config.scWalletAddress, scWalletAbi, provider).connect(config.connectedAddress);

  try {
    console.log('estimateGas s');
    await scWalletContract.estimateGas.execute(calls);
    console.log('estimateGas e');
  } catch (e) {
    console.log('estimateGas expected error:', e);
    const error: Error | MissingOffchainDataError = decodeRevertMessage(e as Error);

    if (error instanceof Error) {
      return;
    }

    const responseData = await fetch(error.url + `?args=${error.abiArgs}`);
    const data = (await (responseData.json() as any)).data;

    const callToRegisterData: Call = {
      callee: error.registryAddress,
      functionSelector: utils.id('recordParameter(bytes)').slice(0, 10) as PrefixedBy0x,
      data: defaultAbiCoder.encode(['bytes'], [data]) as PrefixedBy0x,
    };

    calls = [callToRegisterData, ...calls];

    try {
      const encodedData = utils.hexConcat([
        scWalletContract.interface.getSighash('execute') as PrefixedBy0x,
        defaultAbiCoder.encode(
          ['tuple(address callee, bytes4 functionSelector, bytes data)[]'],
          [calls],
        ) as PrefixedBy0x,
      ]);

      const params = [
        {
          nonce: '0x0',
          gasPrice: '0x001',
          gas: '0x001',
          to: config.scWalletAddress,
          from: config.connectedAddress,
          value: '0x0',
          data: encodedData,
          chainId: '0x7a69',
        },
      ];
      const result = await ethereum.request({
        method: 'eth_sendTransaction',
        params,
      });

      console.log('result', result);
    } catch (requestError) {
      console.log('error', requestError);
    }
  }
}

/**
 * decodeRevertMessage
 *
 * Example:
 * `Error: VM Exception while processing transaction: reverted with custom error 'MissingOffchainDataError("0x42Cc87749B4031c53181692c537622e5c3b7d061", "https://composooor.com/api", "0x1234")'`
 *
 * @param error - Error
 * @returns MissingOffchainDataError | undefined
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
  }

  return error;
}

/**
 * extractErrorHex
 *
 * @param message
 * @returns
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
