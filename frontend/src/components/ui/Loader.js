import React from 'react';
import './Loader.css';

const Loader = ({ message = "Loading..." }) => (
  <div className="loader-overlay">
    <div className="spinner" />
    <span className="loader-message">{message}</span>
  </div>
);

export default Loader;
