import { useCallback } from "react";
import { BuyNowPayLater__factory } from "@composooor/example-contract";

import { useComposooor } from "@composooor/composooor";

const ButtonPay = () => {
  const { write } = useComposooor({
    scWalletAddr: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    abi: BuyNowPayLater__factory.abi,
    functionName: "buyNowPayLater",
    args: [],
  });

  const onClick = useCallback(() => {
    write?.();
  }, []);

  return (
    <button
      onClick={onClick}
      className="btn-2 btn text-lg px-3 py-2 mt-3 text-sm font-medium text-center text-white rounded-lg"
    >
      Buy now
    </button>
  );
};

export default ButtonPay;
