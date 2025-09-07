import { useState } from 'react';
import { DataContext } from '../context/dataContext';
import Frame from '../frame/frame';
import './sample.css';

const Sample = () => {
  const [data, setData] = useState('hello freinds hai');
  return (
    <div className="hai">
      <DataContext.Provider value={{ text: data, btn: 'Save' }}>
        <Frame />
      </DataContext.Provider>
    </div>
  );
};
export default Sample;
