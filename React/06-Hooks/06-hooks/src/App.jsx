import { Routes, Route } from 'react-router-dom';

import './App.css';
import Reference from './Pages/reference/reference';
import Home from './Pages/home/home';
import Form from './Pages/form/form';
import Lib from './Pages/Lib/lib';
import UseEffect from './Pages/UseEffect/useEffect';
import Sample from './Pages/Sample/sample';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/reference" element={<Reference />}></Route>
      <Route path="/form" element={<Form />}></Route>
      <Route path="/lib" element={<Lib/>}></Route>
      <Route path="/useeffect" element={<UseEffect/>}></Route>
     <Route path="/sample" element={<Sample/>}></Route>
    </Routes>
  );
};
export default App;
