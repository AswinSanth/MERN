import './App.css';
import { Routes, Route } from 'react-router';
import Home from './pages/home/home';
import SignUp from './pages/signup/signup';
import Login from './pages/login/login';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={< Login/>} />
        
      </Routes>
    </div>
  );
};

export default App;
