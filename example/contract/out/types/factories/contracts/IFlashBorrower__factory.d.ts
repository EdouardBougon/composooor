import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IFlashBorrower, IFlashBorrowerInterface } from "../../contracts/IFlashBorrower";
export declare class IFlashBorrower__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "callbackData";
            readonly type: "bytes";
        }];
        readonly name: "flashCallback";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IFlashBorrowerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IFlashBorrower;
}
