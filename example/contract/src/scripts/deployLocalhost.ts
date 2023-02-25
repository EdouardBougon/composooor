import type { Contract, ContractFactory } from '@ethersproject/contracts';

import { addressExporter, ethers } from 'hardhat';

async function main(): Promise<void> {
  const TestContractFactory: ContractFactory = await ethers.getContractFactory('Test');
  const test: Contract = await TestContractFactory.deploy();

  await test.deployed();

  // Export/Save contract address to front app
  await addressExporter.save({
    Test: test.address,
  });

  console.log(`Test contract deployed to ${test.address}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
