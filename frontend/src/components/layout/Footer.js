import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer-container">
    <div className="footer-content">
      <span>&copy; {new Date().getFullYear()} Image Classifier Project | Built with Flask & ReactJS</span>
    </div>
  </footer>
);

export default Footer;
