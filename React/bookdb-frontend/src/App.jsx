import './App.css';
import { Routes, Route } from 'react-router';
import Home from './pages/home/home';
import SignUp from './pages/signup/signup';
import Login from './pages/login/login';
import EditBook from './pages/editBooks/editBooks';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/addBook" element={<EditBook />} />
        <Route path="/editBook/:id" element={<EditBook />} />
      </Routes>
    </div>
  );
};

export default App;
