import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Navbar = ({ handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Courtemanche Financial</div>
      <ul className="nav-links">
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/research">Research</Link></li>
        <li><Link to="/buy">Buy</Link></li>
        <li><Link to="/sell">Sell</Link></li>
        <li><Link to="/about">About</Link></li>
        {/* <li><Link to="/profile">Profile</Link></li> */}
        <li><Logout handleLogout={handleLogout} /></li>
      </ul>
    </nav>
  );
};

export default Navbar;