import { useCallback, useEffect, useState } from "react";
import { BuyNowPayLater__factory } from "@composooor/example-contract";
import { useComposooor } from "@composooor/composooor";
import { useWaitForTransaction } from "wagmi";
import ClipLoader from "react-spinners/ClipLoader";
import { useWalletAddress } from '../config/address';


export interface ButtonPayComposooorProps {
  addLog: (log: string) => void;
  resetLogs: () => void;
}


const ButtonPayComposooor = ({ addLog, resetLogs }: ButtonPayComposooorProps) => {
  const { buyNowPayLaterAddress, scWalletAddress } = useWalletAddress()

  const [isDisabled, setDisabled] = useState(false);
  const {
    write,
    data: dataComposooor,
    isError: isWritError,
    isPrepareError,
  } = useComposooor({
    scWalletAddr: scWalletAddress,
    address: buyNowPayLaterAddress,
    abi: BuyNowPayLater__factory.abi,
    functionName: "buyNowPayLater",
    args: [],
    addLog,
    resetLogs,
  });

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
  } = useWaitForTransaction({
    hash: dataComposooor?.hash,
    onSuccess: () => {
      setDisabled(true);
    },
  });

  const onClick = useCallback(() => {
    addLog('Sending transaction to Metamask')
    write?.();
  }, [write]);

  useEffect(
    () => { if (isTransactionSuccess) { addLog('Transaction executed with success') } },
    [isTransactionSuccess]
  );

  useEffect(
    () => { if (isWritError) { addLog('Transaction Error') } },
    [isWritError]
  );

  const isBuyPossible =
    !isTransactionLoading &&
    !isTransactionSuccess &&
    !isTransactionError &&
    !isWritError &&
    !isPrepareError;

  return (
    <button
      disabled={!isBuyPossible || isDisabled}
      onClick={onClick}
      className={`${isDisabled && "cursor-not-allowed"
        } btn-2 btn text-lg px-3 py-2 mt-3 text-sm font-medium text-center rounded-lg`}
    >
      {isTransactionLoading && <ClipLoader size={20} color={"#000"} />}
      {isTransactionSuccess && <span>Transaction success!</span>}
      {(isTransactionError || isWritError) && <span>Transaction error!</span>}
      {isPrepareError && <span>Buy not possible</span>}
      {isBuyPossible && <span>Buy now</span>}
    </button>
  );
};

export default ButtonPayComposooor;
