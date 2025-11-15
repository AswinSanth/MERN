import Home from '../pages/home-page/home';
import Landing from '../pages/landing-page/landing';
import Login from '../pages/login-page/login';
import SignUp from '../pages/signUp-page/signup';
import Cart from '../pages/cart-page/cart';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import AddProduct from '../pages/add-product-page/addproduct';
import Product from '../pages/product-page/product';
import Order from '../pages/order-page/order';
import Profile from '../pages/profile-page/profile';
import Reset from '../pages/forget-password/forget-pass';
import MyOrder from '../pages/my Orders/myOrder-page';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />  
        <Route path="/Reset/:id" element={<Reset />} />

        

        
        <Route element={<PrivateRoute />}>
        <Route path="/Home" element={<Home />} />
        <Route path="/Cart/:id" element={<Cart />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/EditProduct/:id" element={<AddProduct />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/Profile/:userId" element={<Profile />} />
        <Route path="/MyOrder" element={<MyOrder/>} />
      
        </Route>
      </Routes>
    </div>
  );
};
export default App;
