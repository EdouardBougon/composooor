"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useComposooor = void 0;
const react_1 = require("react");
const wagmi_1 = require("wagmi");
const ethers_1 = require("ethers");
const SmartContractWallet__factory_1 = require("./abi/SmartContractWallet__factory");
/**
 * useComposooor
 */
function useComposooor(config) {
    const iface = new ethers_1.utils.Interface(config.abi);
    const [calls, setCalls] = (0, react_1.useState)([
        {
            callee: config.address,
            functionSelector: iface.getSighash(config.functionName),
            data: config.args.length > 0 ? `0x${iface.encodeFunctionData(config.functionName, config.args).slice(10)}` : '0x',
        },
    ]);
    const [data, setData] = (0, react_1.useState)();
    const [missingOffchainDataError, setMissingOffchainDataError] = (0, react_1.useState)();
    const provider = (0, wagmi_1.useProvider)({ chainId: config.chainId });
    const scWalletContract = new ethers_1.Contract(config.scWalletAddr, SmartContractWallet__factory_1.abi, provider);
    console.log('useComposooor', calls[0]);
    // setCalls([
    //   {
    //     callee: config.address,
    //     functionSelector: iface.getSighash(config.functionName) as PrefixedBy0x,
    //     data: iface.encodeFunctionData(config.functionName, config.args) as PrefixedBy0x,
    //   },
    // ]);
    // const { error: simulationError } = useAsync<BigNumber, RevertMessage>(async () =>
    //   scWalletContract.estimateGas.execute(calls),
    // );
    // useEffect(() => {
    //   if (simulationError === undefined) {
    //     return;
    //   }
    //   const error: MissingOffchainDataError = decodeRevertMessage(simulationError.reason);
    //   setMissingOffchainDataError(error);
    //   const { data: responseDate } = useAxiosGet<ComposooorQueryParams, ComposooorApiResponse>(error.url, {
    //     params: {
    //       args: error.abiArgs,
    //     },
    //   });
    //   setData(responseDate?.data);
    // }, [simulationError]);
    // useEffect(() => {
    //   if (data === undefined || missingOffchainDataError === undefined) {
    //     return;
    //   }
    //   const callToRegisterData: Call = {
    //     callee: missingOffchainDataError.registryAddress,
    //     functionSelector: utils.id('recordParameter(bytes)').slice(0, 10) as PrefixedBy0x,
    //     data: utils.defaultAbiCoder.encode(['bytes'], [data]) as PrefixedBy0x,
    //   };
    //   setCalls((previousCalls: Call[]) => [callToRegisterData, ...previousCalls]);
    // }, [data, missingOffchainDataError]);
    const { config: prepareConfig } = (0, wagmi_1.usePrepareContractWrite)({
        abi: SmartContractWallet__factory_1.abi,
        address: config.scWalletAddr,
        functionName: 'execute',
        args: [calls],
    });
    return (0, wagmi_1.useContractWrite)(prepareConfig);
}
exports.useComposooor = useComposooor;
/**
 * decodeRevertMessage
 *
 * Example:
 * `Error: VM Exception while processing transaction: reverted with custom error 'MissingOffchainDataError("0x42Cc87749B4031c53181692c537622e5c3b7d061", "https://composooor.com/api", "0x1234")'`
 */
function decodeRevertMessage(message) {
    const [url, abiArgs, registryAddress] = message
        .split('MissingOffchainDataError("')[1]
        .split(')')[0]
        .split('", "');
    return { url, abiArgs, registryAddress };
}
//# sourceMappingURL=composooor.js.map