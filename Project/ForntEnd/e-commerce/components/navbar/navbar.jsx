import { useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="main-head flex m-1">
        <img src="/logo.svg" alt="logo" className="logo" />
        <h2>Stuffus</h2>
      </div>
      <div className="menu">
        <p>Home</p>
        <p>about</p>
        <p>shop</p>
      </div>
      <div className="signup-btn m-1"></div>
      <button
        onClick={() => {
          navigate('/SignUp');
        }}
        class="button-50"
        role="button"
      >
        Sign Up
      </button>
    </div>
  );
};
export default Navbar;
