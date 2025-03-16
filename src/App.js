import React, { useState, useEffect } from 'react';
import './App.css';

const Stopwatch = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeInSeconds(0);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch-title">Stopwatch</h1>
      <p className="stopwatch-time">Time: {formatTime(timeInSeconds)}</p>
      <div className="stopwatch-buttons">
        <button className="start-stop-button" onClick={handleStartStop}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
