import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="nav-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="logo-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19 2H5C3.346 2 2 3.346 2 5V19C2 20.654 3.346 22 5 22H19C20.654 22 22 20.654 22 19V5C22 3.346 20.654 2 19 2ZM19 20H5C4.449 20 4 19.551 4 19V5C4 4.449 4.449 4 5 4H19C19.551 4 20 4.449 20 5V19C20 19.551 19.551 20 19 20Z"></path>
          <path d="M12 18H16V16H12V18Z"></path>
          <path d="M8 14H16V12H8V14Z"></path>
          <path d="M8 10H16V8H8V10Z"></path>
        </svg>
        <span className="logo-text">Bookish</span>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <a href="#" className="nav-link ">
          Home
        </a>
        <a href="#" className="nav-link">
          Browse
        </a>
        <a href="#" className="nav-link">
          Bestsellers
        </a>
        <a href="#" className="nav-link">
          Contact
        </a>
      </div>

      {/* Action Icons */}
      <div className="nav-actions">
        <button className="nav-icon-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <button className="nav-icon-btn cart-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span className="cart-badge">2</span>
        </button>
      </div>
    </div>
  );
};
export default Navbar;
