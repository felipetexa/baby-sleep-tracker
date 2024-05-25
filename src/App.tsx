import React, { useState } from 'react';
import Report from './components/Report';
import Timer from './components/Timer';

const App: React.FC = () => {
  const [timerStopped, setTimerStopped] = useState<boolean>(false);

  const handleTimerStop = () => {
    setTimerStopped(true);
  };

  const handleTimerReset = () => {
    setTimerStopped(false);
  };

  return (
    <div>
      <Timer onStop={handleTimerStop} onReset={handleTimerReset} />
      {timerStopped && <Report />}
    </div>
  );
};

export default App;
