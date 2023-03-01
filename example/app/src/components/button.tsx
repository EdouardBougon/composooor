import { useCallback } from "react";
import { BuyNowPayLater__factory } from "@composooor/example-contract";
import { useComposooor } from "@composooor/composooor";
import { useWaitForTransaction } from "wagmi";
import ClipLoader from "react-spinners/ClipLoader";

const ButtonPay = () => {
  const { write, data: dataComposooor } = useComposooor({
    scWalletAddr: "0x8464135c8F25Da09e49BC8782676a84730C318bC",
    address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    abi: BuyNowPayLater__factory.abi,
    functionName: "buyNowPayLater",
    args: [],
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: dataComposooor?.hash,
  });

  const onClick = useCallback(() => {
    write?.();
  }, []);

  return (
    <button
      onClick={onClick}
      className="btn-2 btn text-lg px-3 py-2 mt-3 text-sm font-medium text-center rounded-lg"
    >
      {isLoading && <ClipLoader size={20} color={"#000"} />}
      {isSuccess && <span>Transaction success!</span>}
      {!isLoading && !isSuccess && <span>Buy now</span>}
    </button>
  );
};

export default ButtonPay;
