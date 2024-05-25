import React, { useState, useEffect } from 'react';
import { getSleepingData } from '../services/api';

interface SleepRecord {
  id: number;
  startTime: string;
  pauseTime: string;
  endTime: string;
  wakeUpCount: number;
}

const Report: React.FC = () => {
  const [lastSleepRecord, setLastSleepRecord] = useState<SleepRecord | null>(null);

  useEffect(() => {
    getSleepingData()
      .then((response) => {
        const sleepRecords = response.data;
        if (sleepRecords.length > 0) {
          setLastSleepRecord(sleepRecords[sleepRecords.length - 1]);
        }
      })
      .catch((error) => {
        console.error('Error fetching sleep records:', error);
      });
  }, []);

  if (!lastSleepRecord) {
    return <div>Loading...</div>;
  }

  const calculateTotalSleepHours = (): string => {
    const startDate = new Date(lastSleepRecord.startTime);
    const endDate = new Date(lastSleepRecord.endTime);
    const totalMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());

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
    </div>
  );
};

export default Report;
