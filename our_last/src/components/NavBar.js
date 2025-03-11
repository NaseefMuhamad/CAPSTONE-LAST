// src/components/NavBar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Club Hub</div>
      <button className="nav-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <NavLink to="/" className="nav-link" activeClassName="active" exact onClick={() => setIsOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/dashboard" className="nav-link" activeClassName="active" onClick={() => setIsOpen(false)}>
          Dashboard
        </NavLink>
        <NavLink to="/club/datascience" className="nav-link" activeClassName="active" onClick={() => setIsOpen(false)}>
          Data Science
        </NavLink>
        <NavLink to="/club/cybersecurity" className="nav-link" activeClassName="active" onClick={() => setIsOpen(false)}>
          Cybersecurity
        </NavLink>
        <NavLink to="/club/robotics" className="nav-link" activeClassName="active" onClick={() => setIsOpen(false)}>
          Robotics
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;