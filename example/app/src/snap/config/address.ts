import { PrefixedBy0x } from '@composooor/composooor';
import { useProvider } from 'wagmi';

export interface ContractAddress {
    scWalletAddress: PrefixedBy0x;
    buyNowPayLaterAddress: PrefixedBy0x;
}

export const useWalletAddress = (): ContractAddress => {
    const provider = useProvider();
    switch (provider.network.chainId) {
        case 31337:
            return {
                scWalletAddress: '0x8464135c8F25Da09e49BC8782676a84730C318bC',
                buyNowPayLaterAddress: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
            }
        case 84531:
            return {
                scWalletAddress: '0x90FFfF20B1781743B759e72800534981A95e8ae1',
                buyNowPayLaterAddress: '0x43b949724b56fd72F0Ad55d65685b7bD2F05800D',
            }
        default: 
            throw new Error(`Unknown chainId ${provider.network.chainId}`);
    }

}
