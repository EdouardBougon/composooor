import { providers, Contract } from 'ethers';

import { ContractAddresses_31337 } from './addresses';
import { abi as scWalletAbi } from './abi/SmartContractWallet__factory';

// import post from 'axios';

const provider = new providers.JsonRpcProvider('http://localhost:8545');

interface Call {
  callee: string;
  functionSelector: string;
  data: string;
}

export async function composooor(scWalletAddr: string, callee: string, functionSelector: string, args: string) {
  const signer = provider.getSigner();
  const scWalletContract = new Contract(scWalletAddr, scWalletAbi, signer);

  const calls: Call[] = [
    {
      callee: callee,
      functionSelector: functionSelector,
      data: args,
    },
  ];

  try {
    const res = await scWalletContract.estimateGas.execute(calls);

    return res;
  } catch (e) {
    const { apiUrl, params, registryAddress } = decodeRevertMessage((e as any).reason);

    console.log(apiUrl, params, registryAddress);

    //   await post(apiUrl, params).then(async (abiEncodedParams: any) => storeInRegistry(registryAddress, abiEncodedParams));
    return e;
  }
}

const decodeRevertMessage = (message: any): { apiUrl: string; params: string; registryAddress: string } => {
  // example: Error: VM Exception while processing transaction: reverted with custom error 'MissingOffchainDataError("0x42Cc87749B4031c53181692c537622e5c3b7d061", "https://composooor.com/api", "0x1234")'
  const [apiUrl, params, registryAddress] = message.split('MissingOffchainDataError("')[1].split(')')[0].split('", "');

  return { apiUrl, params, registryAddress };
};

/* const storeInRegistry = async (registryAddress: string, params: string) => {};
 */