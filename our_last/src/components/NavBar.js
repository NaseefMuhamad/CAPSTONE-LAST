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
        <NavLink to="/login" className="nav-link" activeClassName="active" onClick={() => setIsOpen(false)}>
          Login
        </NavLink>
        <NavLink to="/signup" className="nav-link" activeClassName="active" onClick={() => setIsOpen(false)}>
          Signup
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;