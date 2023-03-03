import { FaEthereum } from "react-icons/fa";
import ButtonPayComposooor from "./buttonComposooor";
import nft from "../assets/nft.png";

const CardComposooor = () => {
  return (
    <div className="z-10">
      <div className="w-72 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg w-full" src={nft} alt="" />
        <div className="p-5">
          <div>
            <p className="text-white text-2xl text-center underline mb-5">
              Kairos Eagle
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-white text-2xl">#7649</p>
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
            <ButtonPayComposooor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComposooor;
