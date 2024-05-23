
import React from 'react';
interface SleepRecord {
  id: number;
  startTime: string;
  pauseTime: string;
  endTime: string;
  wakeUpCount: number;
}

interface ReportProps {
  lastSleepRecord: SleepRecord;
} 

const Report: React.FC<ReportProps> = ({ lastSleepRecord })  =>  {

 

  const calculateTotalSleepHours = (): string => {
    console.log(lastSleepRecord)
    const startDate = new Date(lastSleepRecord.startTime);
    const endDate = new Date(lastSleepRecord.endTime);
    console.log('Parsed start date:', startDate);
    console.log('Parsed end date:', endDate);
    const totalMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());
    console.log('Total milliseconds:', totalMilliseconds);

    const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalMilliseconds % (1000 * 60)) / 1000);

    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const calculateWakeUpCount = (): number => {
    return lastSleepRecord.wakeUpCount;
  };

  const calculateTotalElapsedTime = (): number => {
    const pauseTime = new Date(lastSleepRecord.pauseTime);
    const startTime = new Date(lastSleepRecord.startTime);
    return Math.abs(pauseTime.getTime() - startTime.getTime()) / 1000;
  };

  
  return (
    <div>
      <h1>Report</h1> 
      <p>Total Sleep Hours: {calculateTotalSleepHours()}</p>
      <p>Wake Up Count: {calculateWakeUpCount()}</p>
      <p>Time Spent Without Sleeping: {calculateTotalElapsedTime()}</p>
      {/* <p>Net Sleep Hours: {calculateNetSleepHours()} hours</p> */}
    </div>
  )
}

export default Report