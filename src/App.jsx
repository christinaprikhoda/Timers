import { useState } from "react";
import "./App.css";
import { TimerList } from "./components/timer-list";
import { KillList } from "./components/kill-list";

function App() {
  const [timers, setTimers] = useState([]);
  const [killed, setKilled] = useState([]);

  const timeToSeconds = (time) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const handleCreate = () => {
    const currentTime = new Date();
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const seconds = String(currentTime.getSeconds()).padStart(2, "0");

    const endTimeFormatted = `${minutes}:${seconds}`;
    setTimers([...timers, { id: Date.now(), timeStart: endTimeFormatted }]);
  };

  const handleRemove = (id, timeStart, timeEnd) => {
    const startInSeconds = timeToSeconds(timeStart);
    const endInSeconds = timeToSeconds(timeEnd);
    const duration = startInSeconds - endInSeconds;

    setTimers(
      timers.filter((timer) => {
        if (timer.id == id) {
          setKilled([
            ...killed,
            {
              id,
              timeStart: timeStart.toString(),
              timeEnd,
              duration,
            },
          ]);
          return null;
        }
        return timer;
      })
    );
  };

  const handleRestore = (id) => {
    const findedId = killed.find((item) => item.id === id);
    if (findedId) {
      setKilled(killed.filter((item) => item.id !== id));

      setTimers([...timers, { ...findedId }]);
    }

    
  };

  return (
    <>
      <div className="p-4">
        <button
          onClick={handleCreate}
          className="bg-red-300 px-4 py-2 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Create
        </button>
        <div className="flex flex-row gap-6 mt-4">
          <TimerList
            timers={timers}
            onDelete={handleRemove}
            className="flex-1 border border-gray-300 p-4 rounded-md"
          />
          <KillList
            killed={killed}
            onRestore={handleRestore}
            className="flex-1 border border-gray-300 p-4 rounded-md"
          />
        </div>
      </div>
    </>
  );
}

export default App;
