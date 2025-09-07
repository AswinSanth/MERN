import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navibar">
      <div className="menu">
        <h2><Link to="/">HOME</Link></h2>
      </div>
      <div className="items">
      
          <Link to="/about">About</Link>
      
          <Link to="/carrier">Carrier</Link>
       
       
      </div>
    </div>
  );
};
export default Navbar;
