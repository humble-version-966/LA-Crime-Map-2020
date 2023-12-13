import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const [navbarActive, setNavbarActive] = useState(false);

  const handleNavbarToggle = () => {
    setNavbarActive(!navbarActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Crime Map in LA</Link>
        <ul className={navbarActive ? 'navbar-menu active' : 'navbar-menu'}>
          <li className="navbar-item"><Link to="/search">Search</Link></li>
          <li className="navbar-item"><Link to="/report">Report</Link></li>
          <li className="navbar-item"><Link to="/update">Update</Link></li>
          <li className="navbar-item"><Link to="/delete">Delete</Link></li>
          <li className="navbar-item"><Link to="/statistics">Statistics</Link></li>
          <li className="navbar-item"><Link to="/combine">Combine</Link></li>
          <li className="navbar-item"><Link to="/description">Description</Link></li>
        </ul>
        <button className={navbarActive ? 'navbar-toggle active' : 'navbar-toggle'} onClick={handleNavbarToggle}>
          <span className="navbar-toggle-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;