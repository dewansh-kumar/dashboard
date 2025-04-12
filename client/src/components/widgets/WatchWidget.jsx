import { Clock1, Star } from "lucide-react";
import { Timer } from "lucide-react";
import { Pause } from "lucide-react";
import { Play } from "lucide-react";
import { TimerReset } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

export const WatchWidget = () => {
  const [time, setTime] = useState(new Date());
  const [stopwatchTime, setStopwatchTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    console.log("interval id", intervalId);
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // start stop watch
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setStopwatchTime((prevTime) => prevTime + 10);
      }, 10); // Update every 10ms for millisecond accuracy
    }
  };

  // pause stopwatch timing
  const pause = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  // reset stopwatch timing
  const reset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setStopwatchTime(0);
  };

  // formate the timing of stopwatch
  const formatTime = (time) => {
    const milliseconds = time % 1000;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 60000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds / 10).padStart(2, "0")}`;
  };

  return (
    <div className="text-white p-6 rounded-lg shadow-lg  w-full  mx-auto bg-background min-h-[250px]">
      {/* <div className=" flex justify-between font-semibold">
        <h2>Watch</h2>
      </div>
      <div className=" my-4">
        <hr className=" border-lightTextColor" />
      </div> */}
      <div className=" space-y-4">
        <div className="  bg-lightBackground p-4 space-y-3 rounded-md">
          <div className=" text-2xl font-bold space-y-2 text-primary">
            <h1 className=" text-center">Clock</h1>
            <Clock1 className=" m-auto" />
          </div>

          <div className="text-center">
            <h1 className="text-xl font-bold">{time.toLocaleTimeString()}</h1>
          </div>
        </div>

        <div className=" bg-lightBackground p-3 space-y-3 rounded-md ">
          <div className="text-2xl font-bold space-y-2 text-primary ">
            <h1 className=" text-center">Stopwatch</h1>
            <Timer className=" m-auto" />
          </div>

          <div className="text-xl font-bold text-center">
            <h1>{formatTime(stopwatchTime)}</h1>
          </div>

          <div className="space-x-4 flex items-center justify-center">
            {!isRunning && (
              <button
                onClick={start}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                <Play />
              </button>
            )}

            {isRunning && (
              <button
                onClick={pause}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                <Pause />
              </button>
            )}
            <button
              onClick={reset}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <TimerReset />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
