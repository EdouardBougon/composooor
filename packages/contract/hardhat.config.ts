import type { HardhatUserConfig } from 'hardhat/config';

import 'hardhat-watcher';
import '@nomiclabs/hardhat-solhint';
import 'hardhat-abi-exporter';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-address-exporter';
import * as dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    localhost: {
      url: 'http://0.0.0.0:8545',
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      chainId: 31337,
      forking: {
        blockNumber: 16706742,
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY ?? ''}`,
      }
    },
    hardhat: {
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      chainId: 31337,
      forking: {
        blockNumber: 16706742,
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY ?? ''}`,
      }
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY ?? ''}`,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
  },
  paths: {
    root: './src',
    sources: './contracts',
    tests: './tests',
    artifacts: '../artifacts',
    cache: '../cache',
  },
  typechain: {
    outDir: './types',
  },
  watcher: {
    compile: {
      tasks: ['compile'],
      files: ['./src/contracts'],
      verbose: true,
      clearOnStart: true,
      runOnLaunch: true,
      start: 'echo Running my compilation task now..',
    },
    test: {
      tasks: [{ command: 'test' }],
      files: ['./src/tests/**/*', './src/contracts'],
      verbose: true,
      clearOnStart: true,
      runOnLaunch: true,
      start: 'echo Running my test task now..',
    },
    deployLocalhost: {
      tasks: [
        'compile',
        {
          command: 'run',
          params: {
            script: 'src/scripts/deployLocalhost.ts',
          },
        },
      ],
      files: ['./src/contracts', './src/scripts/deployLocalhost.ts'],
      verbose: true,
      clearOnStart: false,
      runOnLaunch: true,
      start: 'echo Deploy contract on localhost now..',
    },
  },
  abiExporter: {
    path: '../../app/src/abi',
    runOnCompile: true,
    // only: [''],
    clear: true,
    flat: true,
    spacing: 2,
  },
  addressExporter: {
    outDir: '../../app/src/config/addresses',
    runPrettier: true,
  },
};

export default config;
