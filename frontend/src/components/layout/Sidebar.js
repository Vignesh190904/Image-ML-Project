import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => (
  <aside className="sidebar">
    <nav className="sidebar-nav">
      <ul>
        <li>
          <NavLink exact="true" to="/" className="sidebar-link" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="sidebar-link" activeclassname="active">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/members" className="sidebar-link" activeclassname="active">
            Members
          </NavLink>
        </li>
        <li>
          <NavLink to="/upload" className="sidebar-link" activeclassname="active">
            Upload
          </NavLink>
        </li>
        {/* Add more navigation items as your project grows */}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
