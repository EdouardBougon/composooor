import { AiOutlineCheck } from "react-icons/ai";


export interface LogProps {
  logs: string[];
}


export function Log({ logs }: LogProps) {
  return (
    <div className="absolute right-20 w-4/12 bg-white p-3 text-black rounded-md">
      <div>
        <ul>
          {logs.map((item, index) => (
            <li key={index} className="flex gap-2 items-center mt-3">
              <AiOutlineCheck color="00FF00" size={30} />
              <p className="font-bold text-lg">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
