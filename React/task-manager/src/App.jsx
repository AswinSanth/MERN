import { Trash2, PencilLine, ClipboardList } from 'lucide-react';
import uniqid from 'uniqid';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState([]);
  const [inputTitle, setTitle] = useState('');
  const [inputDes, setDes] = useState('');
  const [inputDate, setDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [edit, setEdit] = useState(false);
  const [tasktoDlt, setTaskToDlt] = useState();
  const [dragId, setDragID] = useState();
  const [editTask, setEditTask] = useState({
    title: '',
    description: '',
    id: '',
    priority: '',
  });
  const statusArray = ['pending', 'ongoing', 'completed'];
  const [deleted, setDeleted] = useState(false);

  const titleChange = e => {
    setTitle(e.target.value);
  };
  const desChange = e => {
    setDes(e.target.value);
  };
  const dateChange = e => {
    setDate(e.target.value);
  };
  const priorityChange = e => {
    setPriority(e.target.value);
  };
  const statusChange = (newStatus, taskId) => {
    const updatedStatus = input.map(task =>
      task.id == taskId ? { ...task, status: newStatus } : task
    );
    setInput(updatedStatus);
  };

  const onBtnClick = () => {
    if (
      !inputTitle.trim() ||
      !inputDes.trim() ||
      !inputDate.trim() ||
      !priority.trim()
    ) {
      alert('Enter a Task');
      return;
    }
    setInput([
      ...input,
      {
        title: inputTitle,
        description: inputDes,
        priority: priority,
        date: inputDate,
        status: 'pending',
        id: uniqid(),
      },
    ]);
    setDes('');
    setTitle('');
    setDate('');
    setPriority('');
  };
  const onDelete = id => {
    const arr = input.filter(task => task.id != id);
    setInput(arr);
    setDeleted(false);
    setTaskToDlt('');
  };
  const editTitle = e => {
    let title = e.target.value;
    setEditTask({ ...editTask, title: title });
  };
  const editDes = e => {
    let description = e.target.value;
    setEditTask({ ...editTask, description: description });
  };
  const editDate = e => {
    let date = e.target.value;
    setEditTask({ ...editTask, date: date });
  };
  const editPriority = e => {
    let prio = e.target.value;
    setEditTask({ ...editTask, priority: prio });
  };

  const onEditIconPressed = item => {
    setEditTask({
      title: item.title,
      description: item.description,
      date: item.date,
      priority: item.priority,
      id: item.id,
    });
    setEdit(true);
  };
  const editedTask = () => {
    const editTaskValue = input.map(i =>
      i.id == editTask.id
        ? {
            ...i,
            title: editTask.title,
            description: editTask.description,
            date: editTask.date,
            priority: editTask.priority,
          }
        : i
    );
    setInput(editTaskValue);
    setEdit(false);
  };
  const priorityColors = {
    low: '#fdf2b3',
    medium: '#d1eaed',
    high: '#ffdada',
  };
  return (
    <div className="container">
      <div
        className="cover"
        onClick={() => {
          setEdit(false);
        }}
        style={{ display: edit || deleted ? 'block' : 'none' }}
      ></div>
      <div className="modal" style={{ display: edit ? 'block' : 'none' }}>
        <div className="Editarea">
          <input type="text" onChange={editTitle} value={editTask.title} />
          <textarea onChange={editDes} value={editTask.description}></textarea>
          <input type="date" onChange={editDate} value={editTask.date} />
          <label for="proiority-select">priority</label>

          <select
            name="priority"
            id="priority-select"
            value={editTask.priority}
            onChange={editPriority}
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>

          <button onClick={editedTask}>UPdate Task</button>
        </div>
      </div>

      <div
        className="delete-modal"
        style={{ display: deleted ? 'block' : 'none' }}
      >
        <h2>Do You Want to Delete</h2>
        <div className="deletebuttons">
          <button onClick={() => onDelete(tasktoDlt)}>Confrim</button>
          <button onClick={() => setDeleted(false)}>Cancel</button>
        </div>
      </div>
      <div className="box">
        <ClipboardList className="taskIcon" />
        <h1>Task Manager</h1>
      </div>
      <div className="inputarea">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            onChange={titleChange}
            value={inputTitle}
            placeholder="Enter The Title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Desription</label>
          <textarea
            onChange={desChange}
            value={inputDes}
            placeholder="Enter the Description"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" onChange={dateChange} value={inputDate} />
        </div>
        <div className="form-group">
          <label for="proiority-select">priority</label>

          <select
            name="priority"
            id="priority-select"
            value={priority}
            onChange={priorityChange}
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>

        <button onClick={onBtnClick}>ADD TASK</button>
      </div>

      <div className="outputarea">
        {statusArray.map(item => (
          <div
            key={item}
            className="status-section"
            onDragOver={e => e.preventDefault()}
            onDrop={() => {
              setInput(prev =>
                prev.map(task =>
                  task.id === dragId ? { ...task, status: item } : task
                )
              );
              setDragID('');
            }}
          >
            <h2>{item.toUpperCase()}</h2>

            <div className="tasklist">
              {input
                .filter(task => task.status === item)
                .map(task => (
                  <div
                    className="taskcard"
                    draggable
                    onDragStart={() => setDragID(task.id)}
                    style={{
                      backgroundColor: priorityColors[task.priority],
                    }}
                  >
                    <div className="status">
                      <h2>{task.title}</h2>
                      <h4>{task.description}</h4>
                      <p>End DATE:{task.date}</p>
                      <p>{task.priority}</p>

                      <div className="status-option">
                        <p>status:</p>
                        <select
                          name="status"
                          id="status-select"
                          value={task.status}
                          onChange={e => statusChange(e.target.value, task.id)}
                        >
                          <option value="pending">pending</option>
                          <option value="ongoing">ongoing</option>
                          <option value="completed">completed</option>
                        </select>
                      </div>
                      <div className="task-actions">
                        <PencilLine
                          onClick={() => {
                            setEdit(true);
                            onEditIconPressed(task);
                          }}
                        />
                        <Trash2
                          onClick={() => {
                            setDeleted(true);
                            setTaskToDlt(task.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
