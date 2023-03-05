// import CardComposooor from "./components/cardComposooor";
import { useState } from "react";
import CardComposooor from "./components/cardComposooor";
import CardSnap from "./components/cardSnap";
import Log from "./components/log";
import Navbar from "./components/navbar";

function App() {
  const [isSwitched, setIsSwitched] = useState(false);
  return (
    <>
      <Navbar />
      <div className="z-10 inset-center flex gap-20">
        {isSwitched ? <CardSnap /> : <CardComposooor />}
      </div>
      <Log />
      <div className="absolute bottom-0 right-0">
        <button
          className="bg-gray-800 text-white p-2 rounded-md"
          onClick={() => setIsSwitched(!isSwitched)}
        >
          Switch
        </button>
      </div>
      <div className="gradient"></div>
    </>
  );
}

export default App;
