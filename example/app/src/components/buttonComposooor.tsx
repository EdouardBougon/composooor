import { useCallback, useState } from "react";
import { BuyNowPayLater__factory } from "@composooor/example-contract";
import { useComposooor } from "@composooor/composooor";
import { useWaitForTransaction } from "wagmi";
import ClipLoader from "react-spinners/ClipLoader";

const ButtonPayComposooor = () => {
  const [isDisabled, setDisabled] = useState(false);
  const {
    write,
    data: dataComposooor,
    isError: isWritError,
    isPrepareError,
  } = useComposooor({
    scWalletAddr: "0x90FFfF20B1781743B759e72800534981A95e8ae1",
    address: "0x43b949724b56fd72F0Ad55d65685b7bD2F05800D",
    abi: BuyNowPayLater__factory.abi,
    functionName: "buyNowPayLater",
    args: [],
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
    write?.();
  }, [write]);

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
        }btn-2 btn text-lg px-3 py-2 mt-3 text-sm font-medium text-center rounded-lg`}
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
