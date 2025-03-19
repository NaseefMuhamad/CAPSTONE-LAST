// src/components/NavBar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handlePresidentDashboard = () => {
    navigate('/PresDash');
    setIsOpen(false); // Navigate to the President Dashboard
  };
  
  const handleAdminDashboard = () => {
    navigate('/admin');
    setIsOpen(false);
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
        <NavLink to="/UserProfiles" className="nav-link" activeClassName="active" onClick={() => setIsOpen(false)}>
          User Profile
        </NavLink>
        <NavLink to="/signup" className="nav-link" activeClassName="active" onClick={() => setIsOpen(false)}>
          Signup
        </NavLink>
        {user && user.role === 'president' && (
          <button className="nav-link president-dashboard-btn" onClick={handlePresidentDashboard}>
          President Dashboard
        </button>
        )}
        {user && user.role === 'admin' && (
          <button className="nav-link admindashboardbtn" onClick={handleAdminDashboard}>Admin Dashboard</button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;