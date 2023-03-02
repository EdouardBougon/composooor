import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';

/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (): Promise<GetSnapsResponse> => {
  return (await window.ethereum.request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
};

/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  await window.ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: params,
    },
  });
};

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  try {
    const snaps = await getSnaps();

    return Object.values(snaps).find(
      (snap) =>
        snap.id === defaultSnapOrigin && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

const abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'callee',
            type: 'address',
          },
          {
            internalType: 'bytes4',
            name: 'functionSelector',
            type: 'bytes4',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        internalType: 'struct SmartContractWallet.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

const buyNowPayLaterAbi = [
  {
    inputs: [
      {
        internalType: 'contract FakeKairos',
        name: '_kairos',
        type: 'address',
      },
      {
        internalType: 'contract FlashLender',
        name: '_flashLender',
        type: 'address',
      },
      {
        internalType: 'contract MarketPlace',
        name: '_market',
        type: 'address',
      },
      {
        internalType: 'contract IERC721',
        name: '_nft',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: '_wEth',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'registryAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'url',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: 'abiArgs',
        type: 'bytes',
      },
    ],
    name: 'MissingOffchainDataError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'buyNowPayLater',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'callbackData',
        type: 'bytes',
      },
    ],
    name: 'flashCallback',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'recordParameter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

/**
 * Invoke the "hello" method from the example snap.
 */
export const sendHello = async () => {
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'composooor',
        params: {
          scWalletAddress: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
          address: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
          abi: buyNowPayLaterAbi,
          functionName: 'buyNowPayLater',
          args: [],
        },
      },
    },
  });
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
