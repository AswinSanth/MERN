import Button from './Components/Button';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [number, setNumber] = useState([]);
  // const [odd, setOdd] = useState(1);
  // const [even, setEven] = useState(2);

  const onEven = () => {
    let last =number[number.length-1]? number[number.length - 1]:0;
    let next;
    if (last % 2 == 0) {
      next = last + 2;
    } else {
      next = last + 1;
    }
 
    setNumber([...number, next]);
  };
  const onOdd = () => {
    let last =number[number.length-1] ? number[number.length - 1]:0;
    let next;
    if (last % 2 == 1) {
      next = last + 2;
    } else {
      next = last + 1;
    }
    setNumber([...number, next]);
  };

  return (
    <div className="box">
      <ul>
        {number.map(item => {
          return <li>{item}</li>;
        })}
      </ul>
      <Button onOperation={onOdd} className="oddBtn">
        Odd
      </Button>
      <Button onOperation={onEven} className="evenBtn">
        even
      </Button>
    </div>
  );
};

export default App;
