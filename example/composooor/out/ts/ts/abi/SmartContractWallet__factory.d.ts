export declare const abi: readonly [{
    readonly inputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "callee";
            readonly type: "address";
        }, {
            readonly internalType: "bytes4";
            readonly name: "functionSelector";
            readonly type: "bytes4";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly internalType: "struct SmartContractWallet.Call[]";
        readonly name: "calls";
        readonly type: "tuple[]";
    }];
    readonly name: "execute";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
