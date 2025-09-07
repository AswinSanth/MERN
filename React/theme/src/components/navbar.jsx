import { Link } from "react-router-dom";
import "./navbar.css";
import { useTheme } from "../assets/Pages/dataContext/dataContext";

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="navbar">
      <h2>Main</h2>

      <div className="menu">
        <h3><Link to="/">Home</Link></h3>
        <h3><Link to="/about">About</Link></h3>
        <button onClick={toggleTheme}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
