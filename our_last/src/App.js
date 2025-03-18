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
import './styles/App.css';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">Club Hub</div>
          <button className="nav-toggle" onClick={toggleNav}>☰</button>
          <div className={`nav-links ${isNavOpen ? 'active' : ''}`}>
            <NavLink to="/" className="nav-link" activeClassName="active" exact>Home</NavLink>
            <NavLink to="/dashboard" className="nav-link" activeClassName="active">Dashboard</NavLink>
            {localStorage.getItem("authToken") ? (
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;