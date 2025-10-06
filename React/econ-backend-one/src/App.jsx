import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import Products from './pages/products/products';
import { Edit } from 'lucide-react';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/Edit/:id" element={<Products/>}></Route>

      </Routes>
    </>
  );
};
export default App;
