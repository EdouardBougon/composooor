import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';
import { ethers, utils } from 'ethers';
import { defaultAbiCoder } from 'ethers/lib/utils';
import { MissingOffchainDataError } from './types/errors';
import { abi as scWalletAbi } from './abi/smartContractWallet.abi';

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

type PrefixedBy0x = `0x${string}`;

type Call = {
  callee: PrefixedBy0x;
  functionSelector: PrefixedBy0x;
  data: PrefixedBy0x;
};

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  // access params: console.log('params', request.params.version);
  // const flatSig = await wallet.signMessage('Hello World');
  console.log('request', request);

  const config = request.params;
  const iface = new utils.Interface(config.abi as utils.Fragment[]);

  const privKey = await snap.request({
    method: 'snap_getEntropy',
    params: { version: 1 },
  });

  const wallet = new ethers.Wallet(privKey, provider);
  const { address } = wallet;

  const calls: Call[] = [
    {
      callee: address,
      functionSelector: iface.getSighash(config.functionName) as PrefixedBy0x,
      data: `0x${iface
        .encodeFunctionData(config.functionName, config.args)
        .slice(10)}`,
    },
  ];

  const scWalletContract = new ethers.Contract(
    config.scWalletAddress,
    scWalletAbi,
    provider,
  ).connect(address as string);

  try {
    // await scWalletContract.estimateGas.execute(calls);
  } catch (e) {
    const error: Error | MissingOffchainDataError = decodeRevertMessage(
      e as Error,
    );

    /* if (error === undefined) {
      return;
    }
    
    const { data: responseData } = await axios.get(error.url, {
      params: {
        args: error.abiArgs,
      },
    });
    
    const callToRegisterData: Call = {
      callee: error.registryAddress,
      functionSelector: utils
      .id('recordParameter(bytes)')
      .slice(0, 10) as PrefixedBy0x,
      data: defaultAbiCoder.encode(
        ['bytes'],
        [responseData.data],
        ) as PrefixedBy0x,
      };

    calls = [callToRegisterData, ...calls];
    } */
  }

  switch (request.method) {
    case 'composooor':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'Confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('request: ', request.toString()),
            text(ethers.BigNumber.from('0x00').toString()),
            text(ethers.BigNumber.from('0x01').toString()),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};

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
    const decoded = abiCoder.decode(
      ['address', 'string', 'bytes'],
      abiEncodedErrorData,
    );

    return {
      registryAddress: decoded[0],
      url: decoded[1],
      abiArgs: decoded[2],
    };
  }
  console.log(error);

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
