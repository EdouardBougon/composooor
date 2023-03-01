import { FaEthereum } from "react-icons/fa";

const Card = () => {
  const mockData = [
    {
      id: "7649",
      image:
        "https://imagedelivery.net/HifslWxquAKrxzKIDXDdDQ/0xbd17c8020c4f6056c061e18da545011c8dd2c22f7f769b267f0b8af7fcb593e1/w=256",
    },
    {
      id: "3249",
      image:
        "https://imagedelivery.net/HifslWxquAKrxzKIDXDdDQ/0x5f2d0b2aa96910f6476095097f908fce3841a04b7f388d09518871c470649d7d/w=256",
    },
    {
      id: "8387",
      image:
        "https://imagedelivery.net/HifslWxquAKrxzKIDXDdDQ/0xb1827cf8eb4410f6ac43588f041e7bc2497c52327e3c6979d8cfd09c43431adf/w=256",
    },
  ];

  return (
    <div className="pl-5 pt-5 flex gap-6">
      {mockData.map((item) => (
        <div key={item.id} className="w-64 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img className="rounded-t-lg w-full" src={item.image} alt="" />
          <div className="p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-700 dark:text-gray-400">#{item.id}</p>
              </div>
              <div className="flex items-center gap-1">
                <FaEthereum className="text-gray-700 dark:text-gray-400" />
                <p className="text-gray-700 dark:text-gray-400">14.85</p>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <div>
                <p className="text-gray-700 dark:text-gray-400">Pay now : </p>
              </div>
              <div className="flex items-center gap-1">
                <FaEthereum className="text-gray-700 dark:text-gray-400" />
                <p className="text-gray-700 dark:text-gray-400">8.04</p>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <div>
                <p className="text-gray-700 dark:text-gray-400">Pay later : </p>
              </div>
              <div className="flex items-center gap-1">
                <FaEthereum className="text-gray-700 dark:text-gray-400" />
                <p className="text-gray-700 dark:text-gray-400">6.80</p>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <div>
                <p className="text-gray-700 dark:text-gray-400">
                  Intereste rate:
                </p>
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-400">29.01 %</p>
              </div>
            </div>
            <div className="w-full text-center">
              <button className="text-center px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Buy now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
