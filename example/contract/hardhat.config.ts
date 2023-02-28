import type { HardhatUserConfig } from 'hardhat/config';

import 'hardhat-watcher';
import '@nomiclabs/hardhat-solhint';
import 'hardhat-abi-exporter';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-address-exporter';
import "@nomicfoundation/hardhat-foundry";
import * as dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  networks: {
    localhost: {
      url: 'http://0.0.0.0:8545',
      chainId: 31337,
    },
    hardhat: {
      chainId: 31337,
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY ?? ''}`,
    },
  },
  paths: {
    root: './',
    artifacts: './out/artifacts',
    cache: './out/cache',
  },
  typechain: {
    outDir: './out/types',
  },
  watcher: {
    compile: {
      tasks: ['compile'],
      files: ['./contracts'],
      verbose: true,
      clearOnStart: true,
      runOnLaunch: true,
      start: 'echo Running my compilation task now..',
    },
    test: {
      tasks: [{ command: 'test' }],
      files: ['./tests/**/*', './contracts'],
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
            script: 'scripts/deployLocalhost.ts',
          },
        },
      ],
      files: ['./contracts', './scripts/deployLocalhost.ts'],
      verbose: true,
      clearOnStart: false,
      runOnLaunch: true,
      start: 'echo Deploy contract on localhost now..',
    },
  },
  abiExporter: {
    path: '../app/src/abi',
    runOnCompile: true,
    only: ['BuyNowPayLater', 'ComposooorRegister', 'SmartContractWallet'],
    clear: true,
    flat: true,
    spacing: 2,
  },
  addressExporter: {
    outDir: '../app/src/config/addresses',
    runPrettier: true,
  },
};

export default config;
