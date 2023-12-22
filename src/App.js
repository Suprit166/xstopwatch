import { useEffect, useRef, useState } from 'react';
import './App.css';

const format = (timer) => {
  const mins = Math.floor(timer / 60);
  timer %= 60;
  return `${mins}:${timer < 10 ? "0" : ""}${timer}`;
};

function App() {
  
  const [isActivated, setIsActivated] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerId = useRef(null);

  const toggleHandler = () => {
    setIsActivated(!isActivated);
  }

  const reset = () => {
    setIsActivated(false);
    setTimer(0);
  }

  useEffect(() => {
    timerId.current = setInterval(() => {
      if(isActivated) {
        setTimer((prevTimer) => prevTimer + 1);
      }
    }, 1000);
    return () => {
      clearInterval(timerId.current);
    };
  }, [isActivated, timer]);

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <p>Time: {format(timer)}</p>
      <button onClick={toggleHandler}>{isActivated ? "Stop" : "Start"}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
