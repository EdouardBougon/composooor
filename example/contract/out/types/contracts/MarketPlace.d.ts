import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export type SaleOfferStruct = {
    implem: PromiseOrValue<string>;
    tokenId: PromiseOrValue<BigNumberish>;
    price: PromiseOrValue<BigNumberish>;
};
export type SaleOfferStructOutput = [string, BigNumber, BigNumber] & {
    implem: string;
    tokenId: BigNumber;
    price: BigNumber;
};
export interface MarketPlaceInterface extends utils.Interface {
    functions: {
        "buy((address,uint256,uint256),bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "buy"): FunctionFragment;
    encodeFunctionData(functionFragment: "buy", values: [SaleOfferStruct, PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
    events: {};
}
export interface MarketPlace extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: MarketPlaceInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        buy(offer: SaleOfferStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    buy(offer: SaleOfferStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        buy(offer: SaleOfferStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        buy(offer: SaleOfferStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        buy(offer: SaleOfferStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
