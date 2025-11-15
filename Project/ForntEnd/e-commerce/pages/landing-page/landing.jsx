import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import './landing.css';
import ImageSlider from '../../components/image-slider/image-slider';
import Footer from '../../components/footer/footer';
import { useEffect, useRef } from 'react';

const Landing = () => {
  const navigate = useNavigate();
  const footerRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (location.hash === '#footer') {
      footerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);
  return (
    <div className="Main">
      <Navbar />
      <ImageSlider />

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

        <h2 className="deal">Hot Brands Alert</h2>
        <div className="category-row">
          <div className="catergory-card">
            <img src="top1.avif" alt="no-image" />
          </div>
          <div className="catergory-card">
            <img src="top2.avif" alt="no-image" />
          </div>
          <div className="catergory-card">
            <img src="top4.avif" alt="no-image" />
          </div>
          <div className="catergory-card">
            <img src="top5.avif" alt="no_image" />
          </div>
        </div>
        <h2>New on Fashion</h2>
        <div className="category-row">
          <div className="catergory-card">
            <img src="cloth1.avif" alt="cloth1" />
          </div>
          <div className="catergory-card">
            <img src="cloth2.avif" alt="cloth2" />
          </div>
          <div className="catergory-card">
            <img src="cloth3.avif" alt="cloth3" />
          </div>
          <div className="catergory-card">
            <img src="cloth4.avif" alt="clooth1" />
          </div>
        </div>
      </div>
      <div id="footer" ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
