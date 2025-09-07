import { useState } from 'react';
import './App.css';

const App = () => {
  const [time, setTime] = useState(0);
  const printHello = () => {
    setTime(time + 1);
  };
  console.log(time);
  return (
    <div className="container">
      <div className="timer">
        <h2 className="head">{time}</h2>
        <div className="btn">
          <button
            onClick={() => {
              const id=setInterval(printHello, 2000);
            }}
          >
            Start
          </button>
          <button
            onClick={() => {
              clearInterval(id);
            }}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};
export default App;
