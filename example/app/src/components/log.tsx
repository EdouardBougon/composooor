import { AiOutlineCheck } from "react-icons/ai";

const Log = () => {
  const mockData = [
    {
      text: "Transaction prepared",
    },
    {
      text: "Transaction prepared",
    },
  ];

  return (
    <div className="absolute right-20 w-72 bg-white p-3 text-black rounded-md">
      <div>
        <ul>
          {mockData.map((item, index) => (
            <li key={index} className="flex gap-2 items-center mt-3">
              <AiOutlineCheck color="00FF00" size={30} />
              <p className="font-bold text-lg">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Log;
