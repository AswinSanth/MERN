import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="nav">
      <div className="main">
        <h2>Main</h2>
      </div>
      <div className="side">
        <p>
          <Link to="/catergory">Category </Link>
        </p>
        <p>home</p>
      </div>
    </div>
  );
};

export default Navbar;
