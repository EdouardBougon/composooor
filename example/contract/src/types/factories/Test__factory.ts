/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Test, TestInterface } from "../Test";

const _abi = [
  {
    inputs: [],
    name: "test",
    outputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061027c806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063f8a8fd6d14610030575b600080fd5b61003861004e565b6040516100459190610170565b60405180910390f35b600061008e6040518060400160405280600481526020017f7465737400000000000000000000000000000000000000000000000000000000815250610095565b6000905090565b61012b816040516024016100a99190610224565b6040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505061012e565b50565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b6000819050919050565b61016a81610157565b82525050565b60006020820190506101856000830184610161565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156101c55780820151818401526020810190506101aa565b838111156101d4576000848401525b50505050565b6000601f19601f8301169050919050565b60006101f68261018b565b6102008185610196565b93506102108185602086016101a7565b610219816101da565b840191505092915050565b6000602082019050818103600083015261023e81846101eb565b90509291505056fea26469706673582212207ea229cb8ce3bbbb8fa409a7c5592e133706a54f41410f81cbb1c3add121c23564736f6c63430008090033";

type TestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Test__factory extends ContractFactory {
  constructor(...args: TestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Test> {
    return super.deploy(overrides || {}) as Promise<Test>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Test {
    return super.attach(address) as Test;
  }
  override connect(signer: Signer): Test__factory {
    return super.connect(signer) as Test__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestInterface {
    return new utils.Interface(_abi) as TestInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Test {
    return new Contract(address, _abi, signerOrProvider) as Test;
  }
}
