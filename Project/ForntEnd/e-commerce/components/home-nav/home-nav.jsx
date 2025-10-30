import { CiLogin } from 'react-icons/ci';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home-nav.css';

const HomeNavbar = () => {
  const nav = useNavigate();
  const  userId  = localStorage.getItem('userId');
  const onClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    nav('/');
  };

  const addProduvct = () => {
    nav('/AddProduct');
  };
  return (
    <nav className="home-navbar">
      <div className="navbar-logo">
        <Link to="/">Stuffsus</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>

        <Link
          onClick={() => {
            addProduvct();
          }}
          to="/AddProduct"
          className="add-product-btn"
        >
          Add Product
        </Link>

        <Link to={`/Cart/${userId}`} className="cart-btn">
          Cart 🛒
        </Link>
        <CiLogin onClick={() => onClick()} />
      </div>
    </nav>
  );
};

export default HomeNavbar;
