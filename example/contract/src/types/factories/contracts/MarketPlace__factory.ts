/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  MarketPlace,
  MarketPlaceInterface,
} from "../../contracts/MarketPlace";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract IERC721",
            name: "implem",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
        ],
        internalType: "struct SaleOffer",
        name: "offer",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610af9806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063bacc3c9014610030575b600080fd5b61004a600480360381019061004591906106be565b61004c565b005b600061007e8360405160200161006291906107ca565b6040516020818303038152906040528051906020012083610195565b905073c02aaa39b223fe8d0a0e5c4f27ead9083c756cc273ffffffffffffffffffffffffffffffffffffffff166323b872dd338386604001516040518463ffffffff1660e01b81526004016100d593929190610803565b6020604051808303816000875af11580156100f4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101189190610872565b50826000015173ffffffffffffffffffffffffffffffffffffffff166323b872dd823386602001516040518463ffffffff1660e01b815260040161015e93929190610803565b600060405180830381600087803b15801561017857600080fd5b505af115801561018c573d6000803e3d6000fd5b50505050505050565b60008060006101a485856101bc565b915091506101b18161020d565b819250505092915050565b60008060418351036101fd5760008060006020860151925060408601519150606086015160001a90506101f187828585610373565b94509450505050610206565b60006002915091505b9250929050565b600060048111156102215761022061089f565b5b8160048111156102345761023361089f565b5b0315610370576001600481111561024e5761024d61089f565b5b8160048111156102615761026061089f565b5b036102a1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102989061092b565b60405180910390fd5b600260048111156102b5576102b461089f565b5b8160048111156102c8576102c761089f565b5b03610308576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102ff90610997565b60405180910390fd5b6003600481111561031c5761031b61089f565b5b81600481111561032f5761032e61089f565b5b0361036f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161036690610a29565b60405180910390fd5b5b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08360001c11156103ae57600060039150915061044c565b6000600187878787604051600081526020016040526040516103d39493929190610a7e565b6020604051602081039080840390855afa1580156103f5573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036104435760006001925092505061044c565b80600092509250505b94509492505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6104b78261046e565b810181811067ffffffffffffffff821117156104d6576104d561047f565b5b80604052505050565b60006104e9610455565b90506104f582826104ae565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610525826104fa565b9050919050565b60006105378261051a565b9050919050565b6105478161052c565b811461055257600080fd5b50565b6000813590506105648161053e565b92915050565b6000819050919050565b61057d8161056a565b811461058857600080fd5b50565b60008135905061059a81610574565b92915050565b6000606082840312156105b6576105b5610469565b5b6105c060606104df565b905060006105d084828501610555565b60008301525060206105e48482850161058b565b60208301525060406105f88482850161058b565b60408301525092915050565b600080fd5b600080fd5b600067ffffffffffffffff8211156106295761062861047f565b5b6106328261046e565b9050602081019050919050565b82818337600083830152505050565b600061066161065c8461060e565b6104df565b90508281526020810184848401111561067d5761067c610609565b5b61068884828561063f565b509392505050565b600082601f8301126106a5576106a4610604565b5b81356106b584826020860161064e565b91505092915050565b600080608083850312156106d5576106d461045f565b5b60006106e3858286016105a0565b925050606083013567ffffffffffffffff81111561070457610703610464565b5b61071085828601610690565b9150509250929050565b6000819050919050565b600061073f61073a610735846104fa565b61071a565b6104fa565b9050919050565b600061075182610724565b9050919050565b600061076382610746565b9050919050565b61077381610758565b82525050565b6107828161056a565b82525050565b60608201600082015161079e600085018261076a565b5060208201516107b16020850182610779565b5060408201516107c46040850182610779565b50505050565b60006060820190506107df6000830184610788565b92915050565b6107ee8161051a565b82525050565b6107fd8161056a565b82525050565b600060608201905061081860008301866107e5565b61082560208301856107e5565b61083260408301846107f4565b949350505050565b60008115159050919050565b61084f8161083a565b811461085a57600080fd5b50565b60008151905061086c81610846565b92915050565b6000602082840312156108885761088761045f565b5b60006108968482850161085d565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600082825260208201905092915050565b7f45434453413a20696e76616c6964207369676e61747572650000000000000000600082015250565b60006109156018836108ce565b9150610920826108df565b602082019050919050565b6000602082019050818103600083015261094481610908565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265206c656e67746800600082015250565b6000610981601f836108ce565b915061098c8261094b565b602082019050919050565b600060208201905081810360008301526109b081610974565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265202773272076616c60008201527f7565000000000000000000000000000000000000000000000000000000000000602082015250565b6000610a136022836108ce565b9150610a1e826109b7565b604082019050919050565b60006020820190508181036000830152610a4281610a06565b9050919050565b6000819050919050565b610a5c81610a49565b82525050565b600060ff82169050919050565b610a7881610a62565b82525050565b6000608082019050610a936000830187610a53565b610aa06020830186610a6f565b610aad6040830185610a53565b610aba6060830184610a53565b9594505050505056fea2646970667358221220063e46eb774dfb6c50e22979996b2a3b217b2fe28f224a1800bbf14c21bf756b64736f6c63430008120033";

type MarketPlaceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MarketPlaceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MarketPlace__factory extends ContractFactory {
  constructor(...args: MarketPlaceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MarketPlace> {
    return super.deploy(overrides || {}) as Promise<MarketPlace>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MarketPlace {
    return super.attach(address) as MarketPlace;
  }
  override connect(signer: Signer): MarketPlace__factory {
    return super.connect(signer) as MarketPlace__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MarketPlaceInterface {
    return new utils.Interface(_abi) as MarketPlaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MarketPlace {
    return new Contract(address, _abi, signerOrProvider) as MarketPlace;
  }
}