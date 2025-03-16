import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(null); 
  const timerRef = useRef(null); 

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime * 1000; 
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const diffInSeconds = Math.floor((now - startTimeRef.current) / 1000);
        setElapsedTime(diffInSeconds);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch-title">Stopwatch</h1>
      <p className="stopwatch-time">Time: {formatTime(elapsedTime)}</p>
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
