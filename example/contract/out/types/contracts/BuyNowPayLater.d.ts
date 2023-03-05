import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface BuyNowPayLaterInterface extends utils.Interface {
    functions: {
        "buyNowPayLater()": FunctionFragment;
        "flashCallback(bytes)": FunctionFragment;
        "recordParameter(bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "buyNowPayLater" | "flashCallback" | "recordParameter"): FunctionFragment;
    encodeFunctionData(functionFragment: "buyNowPayLater", values?: undefined): string;
    encodeFunctionData(functionFragment: "flashCallback", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "recordParameter", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "buyNowPayLater", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "flashCallback", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "recordParameter", data: BytesLike): Result;
    events: {};
}
export interface BuyNowPayLater extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: BuyNowPayLaterInterface;
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
        buyNowPayLater(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        flashCallback(callbackData: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        recordParameter(_data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    buyNowPayLater(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    flashCallback(callbackData: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    recordParameter(_data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        buyNowPayLater(overrides?: CallOverrides): Promise<void>;
        flashCallback(callbackData: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        recordParameter(_data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        buyNowPayLater(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        flashCallback(callbackData: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        recordParameter(_data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        buyNowPayLater(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        flashCallback(callbackData: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        recordParameter(_data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
