import React, { useState, useEffect } from 'react';
import '../styles/Timer.css';

function Timer() {
  const [time, setTime] = useState(300); // 5 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="timer">
      <p>Time Remaining: {formatTime(time)}</p>
    </div>
  );
}

export default Timer;