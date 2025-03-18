// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import Dashboard from './components/Dashboard';
import RoboticsClub from './clubs/RoboticsClub';
import CybersecurityClub from './clubs/CybersecurityClub';
import DataScienceClub from './clubs/DataScienceClub';
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import './styles/App.css';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  console.log("App rendering, user:", user);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">Club Hub</div>
          <button className="nav-toggle" onClick={toggleNav}>☰</button>
          <div className={`nav-links ${isNavOpen ? 'active' : ''}`}>
            <NavLink to="/" className="nav-link" activeClassName="active" exact>Home</NavLink>
            <NavLink to="/dashboard" className="nav-link" activeClassName="active">Dashboard</NavLink>
            {user ? (
              <button className="nav-link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/signup" className="nav-link" activeClassName="active">Sign Up</NavLink>
                <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
              </>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/club/cybersecurity" element={<CybersecurityClub />} />
          <Route path="/club/datascience" element={<DataScienceClub />} />
          <Route path="/club/robotics" element={<RoboticsClub />} />
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; // Export App only