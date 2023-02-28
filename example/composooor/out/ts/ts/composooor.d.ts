import type { UsePrepareContractWriteConfig } from 'wagmi';
import type { PrefixedBy0x } from './common';
import { useContractWrite } from 'wagmi';
/**
 * UseComposooorConfig
 */
export type UseComposooorConfig = Required<Pick<UsePrepareContractWriteConfig, 'abi' | 'address' | 'args' | 'functionName'>> & UsePrepareContractWriteConfig & {
    scWalletAddr: PrefixedBy0x;
};
/**
 * useComposooor
 */
export declare function useComposooor(config: UseComposooorConfig): ReturnType<typeof useContractWrite>;
