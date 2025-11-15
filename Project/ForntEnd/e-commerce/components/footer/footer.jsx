import React from "react";
import "./footer.css";
import { FaInstagram, FaLinkedinIn, FaBehance, FaDribbble } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="contact-section">
        <div className="contact-left">
          <p className="small-text">NEED HELP?</p>
          <h2 className="contact-heading">
            Contact <span>Us</span>
          </h2>
        </div>
        <div className="contact-btn">
          <button>→</button>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-column">
          <h3 className="footer-logo">Stuffus</h3>
          <p>Your trusted e-commerce destination.</p>
        </div>

        <div className="footer-column">
          <h4>Customer Support</h4>
          <a href="mailto:support@shopease.com">support@shopease.com</a>
          <p>+91 98765 43210</p>
          <p>123 Market Street, Bengaluru, India</p>
          <a href="#">SEE ON MAP ↗</a>
        </div>

        <div className="footer-column">
          <h4>About Us</h4>
          <a href="#">Our Story</a>
          <a href="#">Careers</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>

        <div className="footer-column">
          <h4>Stay Updated</h4>
          <a href="#">SIGN UP FOR OUR NEWSLETTER ↗</a>
          <div className="social-icons">
            <a href="#"><FaBehance /></a>
            <a href="#"><FaDribbble /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
