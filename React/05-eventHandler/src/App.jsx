import { useState } from 'react';
import './App.css';

const App = () => {
  const [value, setValue] = useState([]);

  let text = '';

  const onInputChange = e => {
    text = e.target.value;
  };

  const onBtnAdd = () => {
    setValue([...value, text]);
  };

  return (
    <div className="box">
      <input type="text" onChange={onInputChange} />
      <button onClick={onBtnAdd}>ADD</button>

      <div>
        <ul>
          {value.map(item => {
            return <li>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
