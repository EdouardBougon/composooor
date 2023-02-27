import { composooor } from "../../../../packages/composooor/src";
import { BuyNowPayLater__factory } from "@composooor/contract";

const ButtonPay = () => {
  const bytecode =
    BuyNowPayLater__factory.createInterface().encodeFunctionData(
      "buyNowPayLater"
    );

  const onClick = () => {
    composooor(
      "0x2B2f78c5BF6D9C12Ee1225D5F374aa91204580c3",
      "0x42Cc87749B4031c53181692c537622e5c3b7d061",
      bytecode
    );
  };

  return <button onClick={onClick}>Pay</button>;
};

export default ButtonPay;
