import type { SaleOfferStruct } from '@composooor/example-contract/out/tc/MarketPlace';

import { ethers, Wallet } from 'ethers';
import { MarketPlace__factory } from '@composooor/example-contract';

/**
 * Offer
 */
export interface SignedOffer {
  value: SaleOfferStruct;
  signature: string;
}

/**
 * get Buy Args
 */
export function getBuyArgs(offer: SignedOffer): string {
  const funcSelectorAndData = MarketPlace__factory.createInterface().encodeFunctionData('buy', [
    offer.value,
    offer.signature,
  ]);

  return `0x${funcSelectorAndData.substring(10)}`; // remove function selector
}

/**
 * Get Mock Signed Offer
 *
 * Should be the offer propose by the NFT owner
 */
export async function getMockSignedOffer(implem: string, tokenId: string): Promise<SignedOffer> {
  const offer: SaleOfferStruct = {
    implem,
    tokenId,
    price: ethers.utils.parseEther('1'),
  };

  return {
    value: offer,
    signature: await getMockSignature(offer),
  };
}

/**
 * Get Mock Signature
 *
 * Should be the signature of the offer done by the NFT owner
 */
export async function getMockSignature(offer: SaleOfferStruct): Promise<string> {
  // sign from 0xf39
  const wallet: Wallet = new Wallet('ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80');
  const payload: string = ethers.utils.defaultAbiCoder.encode(
    ['address', 'uint256', 'uint256'],
    [offer.implem, offer.tokenId, offer.price],
  );
  const payloadHash: string = ethers.utils.keccak256(payload);

  console.log(await wallet.signMessage(ethers.utils.arrayify(payloadHash)));

  return '0xa5e77f16012ab61f1c885cd2fca7d720d9e5c7c6aa2592d0102d425ad29700ce58b5a9e66041d072be396bdfe27a2fa32109a2330571b139be711644042c2fc11c';
}
