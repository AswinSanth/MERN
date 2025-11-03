import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import './landing.css';

const Landing = () => {
  const navigate =useNavigate();
  return (
    <div className="Main">
      <Navbar />

      <div className="hero-content">
        <h1>Find Your Next Great Buy</h1>
        <p>Discover amazing products and unbeatable deals, all in one place.</p>
        <button
          className="cta-button"
          onClick={() => {
            navigate('/SignUp');
          }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Landing;
