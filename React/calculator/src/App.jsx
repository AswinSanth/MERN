import { useState } from 'react';
import './App.css';
import { evaluate } from 'mathjs';
const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const keys = [
    '7',
    '8',
    '9',
    'Del',
    '4',
    '5',
    '6',
    '+',
    '1',
    '2',
    '3',
    '-',
    '.',
    '0',
    '/',
    '*',
    'Reset',
    '=',
  ];
  const handleClick = key => {
    if (key === 'Reset') {
      setInput('');
      setResult('');
    } else if (key === 'Del') {
      setInput(input.slice(0, -1));
    } else if (key == '=') {
      setResult(evaluate(input));
    } else {
      setInput(input + key);
    }
  };

  return (
    <div className="container">
      <div className="calculator">
      <h2 className="title">Calc</h2>
      <div className="display">
        <div className="expression">{input || '0'}</div>
        <div className="output">{result || ''}</div>
        <div className="buttons">
          {keys.map(item => {
            return (
              <div className={`btn 
              ${item === 'Del' ? 'del' : ''} 
              ${item === 'Reset' ? 'reset' : ''} 
              ${item === '=' ? 'equals' : ''}`}
            >
                <button
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  {item}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    
    </div>
    </div>
  );
};
export default App;
