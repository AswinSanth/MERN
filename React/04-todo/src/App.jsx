import './App.css';
import { Trash2, PencilLine, Italic } from 'lucide-react';
import { useState } from 'react';
import uniqid from 'uniqid';

const App = () => {
  const [value, setValue] = useState([]);
  const [inputData, setInputData] = useState('');
  const [inputDes, setInputDes] = useState('');
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState({
    item: '',
    description: '',
    id: '',
  });
  const editIconPressed = item => {
    setEditTodo({
      item: item.title,
      description: item.description,
      id: item.id,
    });
  };

  const onTextChange = e => {
    setInputData(e.target.value);
  };
  const onDesChange = t => {
    setInputDes(t.target.value);
  };
  const onButtonClick = () => {
    if (inputData == '' && inputDes == '') {
      console.log('enter the task');
    } else {
      setValue([
        ...value,
        {
          title: inputData,
          description: inputDes,
          status: 'pending',
          id: uniqid(),
        },
      ]);
    }
    setInputData('');
    setInputDes('');
  };

  const onDelete = i => {
    const arr = [...value];
    arr.splice(i, 1);
    setValue(arr);
  };

  const onCheckedTodo = (e, index) => {
    const todocopy = [...value];
    todocopy[index].status = e.target.checked ? 'completed' : 'pending';
    setValue(todocopy);
  };

  const onKeyDown = e => {
    if (e.key == 'Enter') {
      onButtonClick();
    }
  };
  const onKeyDownUpdate = e => {
    if (e.key == 'Enter') {
      updateTodo();
    }
  };
  const onEditTitle = e => {
    let item = e.target.value;
    setEditTodo({ ...editTodo, item: item });
  };
  const onEditDes = e => {
    let description = e.target.value;
    setEditTodo({ ...editTodo, description: description });
  };
  const updateTodo = () => {
    const update = value.map(i =>
      i.id == editTodo.id
        ? { ...i, title: editTodo.item, description: editTodo.description }
        : i
    );
    setValue(update);
    setEdit(false);
  };

  return (
    <div className="container">
      <div
        className="cover"
        onClick={() => {
          setEdit(false);
        }}
        style={{ display: edit ? 'block' : 'none' }}
      ></div>
      <div className="modal" style={{ display: edit ? 'block' : 'none' }}>
        <input
          type="text"
          value={editTodo.item}
          onChange={onEditTitle}
          onKeyDown={onKeyDownUpdate}
        />
        <div className="newtodo">
          <textarea
            onChange={onEditDes}
            value={editTodo.description}
            onKeyDown={onKeyDownUpdate}
          ></textarea>
          <button onClick={updateTodo}>Update</button>
        </div>
      </div>

      <div className="box">
        <div className="todo">
          <i class="fa-notdog fa-solid fa-calendar fa-bounce"></i>
          <h1>To Do-list</h1>
        </div>
        <div className="first">
          <input
            type="text"
            onChange={onTextChange}
            placeholder="Add Title "
            value={inputData}
            onKeyDown={onKeyDown}
          />
          <textarea
            onChange={onDesChange}
            value={inputDes}
            onKeyDown={onKeyDown}
          ></textarea>
          <button onClick={onButtonClick}>Add</button>
        </div>
        <div className="listarea">
          {value.map((item, index) => {
            return (
              <div className="listitems">
                <input
                  type="checkbox"
                  onChange={e => {
                    onCheckedTodo(e, index);
                  }}
                />

                <div className="titleDes">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <p>{item.status}</p>
                </div>
                <PencilLine
                  className="edit"
                  onClick={() => {
                    setEdit(true);
                    editIconPressed(item);
                  }}
                />
                <Trash2
                  className="trash-icon"
                  onClick={() => {
                    onDelete(index);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
