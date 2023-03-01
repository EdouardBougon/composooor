import { FaEthereum } from "react-icons/fa";
import ButtonPay from "./button";

const Card = () => {
  const mockData = [
    {
      id: "7649",
      image:
        "https://imagedelivery.net/HifslWxquAKrxzKIDXDdDQ/0xbd17c8020c4f6056c061e18da545011c8dd2c22f7f769b267f0b8af7fcb593e1/w=256",
    },
  ];

  return (
    <div className="z-10	inset-center">
      {mockData.map((item) => (
        <div className="w-72 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img className="rounded-t-lg w-full" src={item.image} alt="" />
          <div className="p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-white text-2xl">#{item.id}</p>
              </div>
              <div className="flex items-center gap-1">
                <FaEthereum className="text-white" />
                <p className="text-white text-2xl">15</p>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <div>
                <p className="text-white text-2xl">Pay now : </p>
              </div>
              <div className="flex items-center gap-1">
                <FaEthereum className="text-white" />
                <p className="text-white text-2xl">1</p>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <div>
                <p className="text-white text-2xl">Pay later : </p>
              </div>
              <div className="flex items-center gap-1">
                <FaEthereum className="text-white" />
                <p className="text-white text-2xl">14</p>
              </div>
            </div>
            <div className="w-full text-center">
              <ButtonPay />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
