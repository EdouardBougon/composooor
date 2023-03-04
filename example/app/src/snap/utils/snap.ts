import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';
import { BuyNowPayLater__factory } from "@composooor/example-contract";
import { PrefixedBy0x } from '@composooor/composooor';
import { ComposooorMethodParams, OnComposooorRequestArgs } from '@composooor/snap';

/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (): Promise<GetSnapsResponse> => {
  return (await window.ethereum?.request({
    method: 'wallet_getSnaps',
  } as any)) as unknown as GetSnapsResponse;
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
  await window.ethereum?.request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: params,
    },
  } as any);
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

const buyNowPayLaterAbi = BuyNowPayLater__factory.abi;

/**
 * Invoke the "hello" method from the example snap.
 */
export const buyNowPayLater = async (connectedAddress: PrefixedBy0x) => {
  const request: OnComposooorRequestArgs = {
    method: 'composooor',
    params: {
      connectedAddress,
      scWalletAddress: '0x8464135c8F25Da09e49BC8782676a84730C318bC',
      address: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
      abi: buyNowPayLaterAbi as unknown as ComposooorMethodParams['abi'],
      functionName: 'buyNowPayLater',
      args: [],
    },
  }

  await window.ethereum?.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request,
    },
  } as unknown as any);
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
