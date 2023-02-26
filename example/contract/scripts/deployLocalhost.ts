import type { Contract, ContractFactory } from '@ethersproject/contracts';

import { addressExporter, ethers } from 'hardhat';

async function main(): Promise<void> {
  const SmartContractWalletContractFactory: ContractFactory = await ethers.getContractFactory('SmartContractWallet');
  const smartContractWallet: Contract = await SmartContractWalletContractFactory.deploy();

  await smartContractWallet.deployed();

  const MockNFTContractFactory: ContractFactory = await ethers.getContractFactory('MockNFT');
  const mockNFT: Contract = await MockNFTContractFactory.deploy();

  await mockNFT.deployed();

  const MockWethContractFactory: ContractFactory = await ethers.getContractFactory('MockWeth');
  const mockWeth: Contract = await MockWethContractFactory.deploy();

  await mockWeth.deployed();

  const FakeKairosContractFactory: ContractFactory = await ethers.getContractFactory('FakeKairos');
  const fakeKairos: Contract = await FakeKairosContractFactory.deploy(mockWeth.address);

  await fakeKairos.deployed();

  const FlashLenderContractFactory: ContractFactory = await ethers.getContractFactory('FlashLender');
  const flashLender: Contract = await FlashLenderContractFactory.deploy(mockWeth.address);

  await flashLender.deployed();

  const MarketPlaceContractFactory: ContractFactory = await ethers.getContractFactory('MarketPlace');
  const marketPlace: Contract = await MarketPlaceContractFactory.deploy(mockWeth.address);

  await marketPlace.deployed();

  const BuyNowPayLaterContractFactory: ContractFactory = await ethers.getContractFactory('BuyNowPayLater');
  const buyNowPayLater: Contract = await BuyNowPayLaterContractFactory.deploy(
    fakeKairos.address,
    flashLender.address,
    marketPlace.address,
    mockNFT.address,
    mockWeth.address,
  );

  await buyNowPayLater.deployed();

  // Export/Save contract address to front app
  await addressExporter.save({
    BuyNowPayLater: buyNowPayLater.address,
    SmartContractWallet: smartContractWallet.address,
  });

  console.log(`Test contract deployed to ${buyNowPayLater.address}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
