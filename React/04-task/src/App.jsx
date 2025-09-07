import Button from './Components/Button';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [number, setNumber] = useState([]);

  const onPush = () => {
    let arr = [...number, number.length + 1];
    setNumber(arr);
  };

  const onPop = () => {
    const arr = [...number];
    arr.pop();
    setNumber(arr)
  };
  // const onOdd = () => {
  //   const last = number[number.length - 1];
  //   let next;
  //   if (last % 2 == 1 && last > 0) {
  //     next = last + 2;
  //   } else {
  //     next = last + 1;
  //   }
  //   setNumber([...number, next]);
  // };

  return (
    <div className="box">
      <ul>
        {number.map(item => {
          return <li>{item}</li>;
        })}
      </ul>
      <Button onOperation={onPush} className="oddBtn">
        Push
      </Button>
      <Button onOperation={onPop} className="evenBtn">
        pop
      </Button>
    </div>
  );
};

export default App;
