import { BuyNowPayLater__factory } from "@composooor/contract";
import { composooor } from "../../../../packages/composooor/src";

const ButtonPay = () => {
  const bytecode = BuyNowPayLater__factory.getInterface(
    BuyNowPayLater__factory.abi
  ).getSighash("buyNowPayLater");

  const onClick = () => {
    console.log("bytecode", bytecode);
    composooor(
      "0x2B2f78c5BF6D9C12Ee1225D5F374aa91204580c3",
      "0x42Cc87749B4031c53181692c537622e5c3b7d061",
      bytecode
    );
  };

  return <button onClick={onClick}>Pay</button>;
};

export default ButtonPay;
