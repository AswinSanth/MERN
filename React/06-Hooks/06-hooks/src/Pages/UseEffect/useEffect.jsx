import { useEffect, useState } from 'react';
import './useEffect.css';

const UseEffect = () => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);
  useEffect(() => {
    console.log('rendering');
  }, [count]);

  return (
    <div className="box2">
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Count
      </button>
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        Number
      </button>
      <h2>{count}</h2>
      <h2>{number}</h2>
    </div>
  );
};
export default UseEffect;
