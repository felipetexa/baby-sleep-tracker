
interface ReportProps {
  totalSleepHours: number;
  wakeUpCount: number;
  totalElapsedTime: number;
}

const Report: React.FC<ReportProps> = ({totalSleepHours, wakeUpCount, totalElapsedTime}) => {

  const calculateNetSleepHours = () => {
    // Assuming totalElapsedTime is in seconds, convert it to hours
    const netSleepHours = (totalSleepHours - totalElapsedTime / 3600).toFixed(2);
    return Math.max(parseFloat(netSleepHours), 0); // Ensure net sleep hours are not negative
  };

  return (
    <div>
      <h1>Report</h1>
      <p>Total Sleep Hours: {totalSleepHours} hours</p>
      <p>Net Sleep Hours: {calculateNetSleepHours()} hours</p>
      <p>Wake Up Count: {wakeUpCount}</p>
      <p>Time Spent Without Sleeping: {totalElapsedTime} seconds</p>
    </div>
  )
}

export default Report