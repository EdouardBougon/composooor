import { PrefixedBy0x } from '@composooor/composooor';
import { useProvider } from 'wagmi';
import { hardhat, polygon, baseGoerli } from 'wagmi/chains';

export interface ContractAddress {
    scWalletAddress: PrefixedBy0x;
    buyNowPayLaterAddress: PrefixedBy0x;
}

export const useWalletAddress = (): ContractAddress => {
    const provider = useProvider();
    switch (provider.network.chainId) {
        case hardhat.id:
            return {
                scWalletAddress: '0x8464135c8F25Da09e49BC8782676a84730C318bC',
                buyNowPayLaterAddress: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
            }
        case baseGoerli.id:
            return {
                scWalletAddress: '0x7D1347a242D4F3d6Cc304d664a84114D4dD8532F',
                buyNowPayLaterAddress: '0x46454DaF165084b84dAC4b6842593D1C363DF2cC',
            }
        case polygon.id:
            return {
                scWalletAddress: '0xD4183C5f4FC258ebA51E0F30077752E165bE230e',
                buyNowPayLaterAddress: '0x105Bd1c20918d485AeAF016a2813E303FA5e8C0A',
            }
        default: 
            throw new Error(`Unknown chainId ${provider.network.chainId}`);
    }

}
