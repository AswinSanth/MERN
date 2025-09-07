import './data.css';
import { useContext } from 'react';
import { DataContext } from '../context/dataContext';
const Data = () => {
  const { text, btn } = useContext(DataContext);
  return (
    <div className="data">
      <p>{text}</p>
      <button>{btn}</button>
    </div>
  );
};
export default Data;
