"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IFlashBorrower__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "bytes",
                name: "callbackData",
                type: "bytes",
            },
        ],
        name: "flashCallback",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IFlashBorrower__factory {
    static abi = _abi;
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IFlashBorrower__factory = IFlashBorrower__factory;
//# sourceMappingURL=IFlashBorrower__factory.js.map