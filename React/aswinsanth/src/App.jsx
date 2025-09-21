import './App.css';
import { Table } from "antd";
import { Route, Routes } from 'react-router-dom';
import Navbar from './Page/navbar/navBar';
import Home from './Page/home/home';
import Details from './Page/details/details';
import Category from './Page/catergory/cat';
const App = () => {
  return (
    <div className="">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/details/:id" element={<Details/>}></Route>
        <Route path="/catergory" element={<Category/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
