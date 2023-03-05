// import CardComposooor from "./components/cardComposooor";
import { useCallback, useEffect, useState } from "react";
import CardComposooor from "./components/cardComposooor";
import CardSnap from "./components/cardSnap";
import { Log } from "./components/log";
import Navbar from "./components/navbar";

function App() {
  const [isSwitched, setIsSwitched] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(
    () => resetLogs(),
    [isSwitched]
  )

  const addLog = useCallback(
    (log: string) => setLogs((logs: string[]) => {
      if (logs.includes(log)) {
        return logs
      }

      return [...logs, log];

    }), []
  );

  const resetLogs = useCallback(
    () => setLogs([]), []
  );

  return (
    <>
      <Navbar />
      <div className="z-10 inset-center flex gap-20">
        {isSwitched
          ? <CardSnap addLog={addLog} resetLogs={resetLogs} />
          : <CardComposooor addLog={addLog} resetLogs={resetLogs} />}
      </div>
      <Log logs={logs} />
      <div className="absolute bottom-0 right-0">
        <button
          className="bg-gray-800 text-white p-2 rounded-md"
          onClick={() => setIsSwitched(!isSwitched)}
        >
          Switch to {isSwitched ? "Composooor SDK" : "Metamask Snap"}
        </button>
      </div>
      <div className="gradient"></div>
    </>
  );
}

export default App;
