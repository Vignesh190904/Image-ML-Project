import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="header-container">
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          🖼️ Image Classifier
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/home" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">About</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
