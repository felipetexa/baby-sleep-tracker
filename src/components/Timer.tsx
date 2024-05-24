import React from 'react';

import { useEffect, useState } from "react"
import { startTimer, pauseTimer, stopTimer, getSleepingData } from "../services/api";

interface TimerProps {
  onStop: () => void;
  onReset: () => void;
}

const Timer: React.FC<TimerProps> = ({onStop, onReset}) => {

  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [totalElapsedTime, setTotalElapsedTime] = useState<number>(0);
  const [pauseStartTime, setPauseStartTime] = useState<number | null>(null);
  const [showElapsedTime, setShowElapsedTime] = useState<boolean>(false);

  const start = () => {
    setIsRunning(true);
    setShowElapsedTime(false);
    setPauseStartTime(null);
    startTimer();
  }
  const pause = () => {
    setShowElapsedTime(true)
    setIsRunning(false);
    setPauseStartTime(Date.now());
    pauseTimer();
  }
  const stop = () => {
    setIsRunning(false);
    setPauseStartTime(null);
    stopTimer();
    onStop();
    getSleepingData();
  }

  const reset = () => {
    setTotalElapsedTime(0);
    setShowElapsedTime(false);
    setTimer(0);
    onReset();
  }


  // const setTimerState = () => {
  //   return {
  //     timer,
  //     totalElapsedTime,
  //   };
  // };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if(isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000)
    }
  
    return () => clearInterval(interval);
    }, [isRunning])

    useEffect(() => {
      let elapsedInterval: NodeJS.Timeout;
  
      if (!isRunning && pauseStartTime !== null) {
        elapsedInterval = setInterval(() => {
          // const elapsedTime = Math.floor((Date.now() - pauseStartTime) / 1000); // Elapsed time in seconds
          setTotalElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
        }, 1000);
      }
  
      return () => clearInterval(elapsedInterval);
    }, [isRunning, pauseStartTime]);

    const formatTime = (timeInSeconds: number) => {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = timeInSeconds % 60;

      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');
    
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };
  

  return (
    <div>
      <h1>Timer: {formatTime(timer)}</h1>
      {showElapsedTime && (        
        <div>
          <h2>Elapsed Time During Pause:</h2>
          <p>{formatTime(totalElapsedTime)}</p>
        </div>
      )}

      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}



export default Timer