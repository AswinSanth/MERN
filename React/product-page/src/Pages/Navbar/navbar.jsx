import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="nav">
      <h2>Main</h2>
      <div className="menu">
        <h3>
          <Link to="/">Home</Link>
          
        </h3>
        <h3><Link to="/post">post</Link></h3>
      </div>
    </div>
  );
};
export default Navbar;
