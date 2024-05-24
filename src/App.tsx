import { useState, useEffect } from 'react';
import Report from './components/Report';
import Timer from './components/Timer';
import { getSleepingData } from '../src/services/api';

// interface SleepReportData {
//   totalSleepHours: number;
//   wakeUpCount: number;
//   totalElapsedTime: number;
// }
interface SleepRecord {
  id: number;
  startTime: string;
  pauseTime: string;
  endTime: string;
  wakeUpCount: number;
}

const App: React.FC = () => {

  const [timerStopped, setTimerStopped] = useState<boolean>(false);
  // const [sleepReportData, setSleepReportData] = useState<SleepReportData | null>(null);
  const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>([]);

  useEffect(() => {
    getSleepingData()
      .then((response) => {
        setSleepRecords(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sleep records:', error);
      });
  }, [timerStopped]);


  const handleTimerStop = () =>{
    setTimerStopped(true);
    // getSleepingData()
    //   .then(response => {
    //     setSleepReportData(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error while getting sleep data:', error);
    //   });
  }

  const handleTimerReset = () => {
    setTimerStopped(false);
  };

  return (
    <div>
      <Timer onStop={handleTimerStop} onReset={handleTimerReset}/>
      {timerStopped && sleepRecords.length > 0 && (
        <Report lastSleepRecord={sleepRecords[sleepRecords.length - 1]} />
      )} 
    </div>
  )
}

export default App
