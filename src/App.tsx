import { useState } from 'react';
import Report from './components/Report'
import Timer from './components/Timer'

const App: React.FC = () => {

  const [timerStopped, setTimerStopped] = useState<boolean>(false);

  const totalSleepHours = 8;
  const wakeUpCount = 3;
  const totalElapsedTime = 12;

  const handleTimerStop = () =>{
    setTimerStopped(true);
  }

  return (
    <div>
      <Timer onStop={handleTimerStop}/>
      {timerStopped && (
      <Report totalSleepHours={totalSleepHours} wakeUpCount={wakeUpCount} totalElapsedTime={totalElapsedTime} />
      )}
    </div>
  )
}

export default App
