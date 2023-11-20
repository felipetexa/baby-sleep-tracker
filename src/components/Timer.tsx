import { useEffect, useState } from "react"
import { startTimer, pauseTimer, stopTimer } from "../services/api";


const Timer: React.FC = () => {

  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [totalElapsedTime, setTotalElapsedTime] = useState<number>(0);
  const [pauseStartTime, setPauseStartTime] = useState<number | null>(null);

  const start = () => {
    setIsRunning(true);
    setPauseStartTime(null);
    startTimer();
  }
  const pause = () => {
    setIsRunning(false);
    setPauseStartTime(Date.now());
    pauseTimer();
  }
  const stop = () => {
    setIsRunning(false);
    setPauseStartTime(null);
    setTotalElapsedTime(0);
    stopTimer();
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
        setTotalElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000)
    }
  
    return () => clearInterval(interval);
    }, [isRunning])

    useEffect(() => {
      let elapsedInterval: NodeJS.Timeout;
  
      if (!isRunning && pauseStartTime !== null) {
        elapsedInterval = setInterval(() => {
          const elapsedTime = Math.floor((Date.now() - pauseStartTime) / 1000); // Elapsed time in seconds
          setTotalElapsedTime((prevElapsedTime) => prevElapsedTime + elapsedTime);
        }, 1000);
      }
  
      return () => clearInterval(elapsedInterval);
    }, [isRunning, pauseStartTime]);

    const formatTime = (timeInSeconds: number) => {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = timeInSeconds % 60;
      return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    };
  

  return (
    <div>
      <h1>Timer: {formatTime(timer)}</h1>
      {pauseStartTime !== null && (
        <div>
          <h2>Elapsed Time During Pause:</h2>
          <p>{formatTime(totalElapsedTime)}</p>
        </div>
      )}
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}



export default Timer