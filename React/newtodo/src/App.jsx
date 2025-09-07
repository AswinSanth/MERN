import { useState } from 'react';
import './App.css';
import { Trash2 } from 'lucide-react';

const App = () => {
  const [data, setData] = useState([]);
  const[inputData,setInputData]=useState();
  const [inputDes,setInputDes]=useState();
  const onInputDes = t => {
  setInputDes(t.target.value);
  };

  const onInputData = e => {
    setInputData(e.target.value);
  };
  const onStatus = (e, index) => {
    const todoCopy = [...data];
    todoCopy[index].status = e.target.checked ? 'completed' : 'pending';
    setData(todoCopy);
  };

  const onBtnClick = () => {
    setData([
      ...data,
      { title: inputData, description: inputDes, status: 'pending' },
    ]);
    setInputData('');
    setInputDes('');
  };
  const onDlt = i => {
    const todoCopy = [...data];
    todoCopy.splice(i, 1);
    setData(todoCopy);
  };

  return (
    <div className="container">
      <div className="head-section">
        <input type="text" placeholder="Title" onChange={onInputData} value={inputData} />
        <textarea placeholder="Description " onChange={onInputDes} value={inputDes}></textarea>
        <button onClick={onBtnClick}>ADD</button>
      </div>
      <div className="addeditems">
        {data.map((item, index) => {
          return (
            <div className="listitems">
              <input
                type="checkbox"
                onChange={e => {
                  onStatus(e, index);
                }}
              />
              <h3>{item.title}</h3>
              <h4>{item.description}</h4>
              <h4>{item.status}</h4>
              <Trash2
                className="trashicon"
                onClick={() => {
                  console.log('hai');
                  onDlt(index);
                }}
              ></Trash2>
              <p></p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
