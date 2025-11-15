import { CiLogin } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home-nav.css';

const HomeNavbar = () => {
  const nav = useNavigate();
  const userId = localStorage.getItem('userId');
  const onClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    nav('/');
  };

  const addProduct = () => {
    nav('/AddProduct');
  };
  return (
    <nav className="home-navbar">
      <div className="navbar-logo">
        <img src="/logo.svg" alt="logo" className="logo " />
        <Link to="/">Stuffus</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>

        {/* <Link
          onClick={() => {
            addProduvct();
          }}
          to="/AddProduct"
          className="add-product-btn"
        >
          Add Product
        </Link> */}

        <Link to={`/Cart/${userId}`} className="cart-btn">
          Cart 🛒
        </Link>

        <div className="profile-dropdown">
          <CgProfile
            className="profile-icon"
            title="Account"
            onClick={() => {
              nav(`/Profile/${userId}`);
            }}
          />
          <div className="dropdown-menu">
            <Link to={`/Profile/${userId}`} className="dropdown-link">
              👤 Profile
            </Link>
            <Link
              to="/AddProduct"
              // onClick={() => {
              //   addProduct();
              // }}
              className="dropdown-link"
            >
              Become a Seller
            </Link>
            <Link to="/MyOrder" className="dropdown-link">
              My Order
            </Link>
          </div>
        </div>

        <CiLogin onClick={() => onClick()} />
        <div className="dropdown-menu">
          <p>Profile</p>
          <p>My Orders</p>
          <p></p>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
