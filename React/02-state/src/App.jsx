import Button from './Components/Button';
import Button2 from './Components/Button2';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [count, setCount] = useState(0);

  const [number, setNumber] = useState([]);

  const onIncrementCount = () => {
   
    setCount(count + 1);
  };

  const onDecrementCount = () => {
    setCount(count - 1);
  };

  const onPrintAddition = () => {
    let nextArr = [...number, number.length + 1];
    setNumber(nextArr);
  };



  return (
    <div className="container">
      <div className="box">
        <h1>{count}</h1>
        <div className="boxbtn">
          <Button  className='first-btn'onOperation={onIncrementCount} text="ADD"></Button>
          <Button className='second-btn' onOperation={onDecrementCount} text="Sub" />
        </div>
      </div>
      <div className="box2">
        <ul>
          {
            number.map (item => {
              return <li>{item}</li>;
            })
          }
        </ul>
        <Button2 onPrintadd={onPrintAddition}>+</Button2>
      </div>
    </div>
  );
};
export default App;