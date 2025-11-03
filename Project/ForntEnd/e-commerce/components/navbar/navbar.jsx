import { useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="nav">
      <div className="logo">
        <img src="/logo.svg" alt="logo" className="logo-icon" />
        <h2>Stuffus</h2>
      </div>
      <div className="menu">
        <ul className='nav-links'>
          <li className='nav-link'>Home</li>
          <li className='nav-link' >about</li>
          <li className='nav-link'>shop</li>
        </ul>
      </div>
      <div className="btns"></div>
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
