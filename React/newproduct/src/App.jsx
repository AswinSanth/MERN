import './App.css';
import { Link } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Page/navbar/navBar';
import Home from './Page/home/home';
import Details from './Page/details/details';
const App = () => {
  return (
    <div className="">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/details/:id" element={<Details/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
