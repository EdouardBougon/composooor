import type { Test } from '../types';

import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract, ContractFactory } from '@ethersproject/contracts';

describe('Test', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture(): Promise<{
    test: Test;
    owner: any;
    otherAccount: any;
  }> {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const TestContractFactory: ContractFactory = await ethers.getContractFactory('Test');
    const test: Contract = await TestContractFactory.deploy();

    return { test, owner, otherAccount };
  }

  describe('Deployment', function () {
    it('Should not fail', async function () {
      await loadFixture(deployFixture);
    });
  });

  describe('test', function () {
    it('Should return a value', async function () {
      const { test } = await loadFixture(deployFixture);

      await expect(test.test()).to.equal(0)
    });
  });
});
