import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './assets/Pages/home/home';
import About from './assets/Pages/about/about';
import { useTheme } from './assets/Pages/dataContext/dataContext';

const App = () => {
  const { darkMode } = useTheme();


  return (
    <div className={darkMode ? "dark" : "light"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
