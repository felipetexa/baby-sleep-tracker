import Report from './components/Report'
import Timer from './components/Timer'

const App: React.FC = () => {

  const totalSleepHours = 8;
  const wakeUpCount = 3;
  const totalElapsedTime = 12;

  return (
    <div>
      <Timer />
      <Report totalSleepHours={totalSleepHours} wakeUpCount={wakeUpCount} totalElapsedTime={totalElapsedTime} />
    </div>
  )
}

export default App
