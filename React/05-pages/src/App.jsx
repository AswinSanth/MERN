import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './assets/pages/Home/home';
import About from './assets/pages/About/about';
import Carrier from './assets/pages/Carrier/carrier';
import Navbar from '../src/Components/Navbar/navbar';
import NotFound from './assets/pages/NotFound/notfound';
import Dynamic from './assets/pages/Dynamic/dynamic';
import './App.css';

const App = () => {
  const location = useLocation();
  const locationArray = ['/', '/about', '/carrier', '/profile/'];
  const checkLocationDefined = () => {
    return (
      locationArray.includes(location.pathname) ||
      location.pathname.includes('/profile/')
    );
  };
  return (
    <div>
      {checkLocationDefined() ? <Navbar /> : <></>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/carrier" element={<Carrier />} />
        <Route path="/profile/:data" element={<Dynamic />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
