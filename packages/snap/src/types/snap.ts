import type { utils } from 'ethers';
import type { PrefixedBy0x } from './common';

export interface Call {
  callee: PrefixedBy0x;
  functionSelector: PrefixedBy0x;
  data: PrefixedBy0x;
}

/**
 * OnComposooorRpcRequestArgs
 */
export interface OnComposooorRpcRequestArgs {
  origin: string;
  request: OnComposooorRequestArgs;
}

/**
 * OnComposooorRequestArgs
 */
export interface OnComposooorRequestArgs {
  method: 'composooor';
  params: ComposooorMethodParams;
}

/**
 * Config send to the snap `composooor` function
 */
export interface ComposooorMethodParams {
  connectedAddress: PrefixedBy0x;
  scWalletAddress: PrefixedBy0x;
  abi: readonly utils.Fragment[];
  address: PrefixedBy0x;
  functionName: string;
  args: readonly unknown[] | undefined;
}
