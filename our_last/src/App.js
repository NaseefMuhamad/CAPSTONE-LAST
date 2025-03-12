// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'; // Imported and now used
import Welcome from './components/WelcomePage';
import Dashboard from './components/Dashboard';
import ClubPage from './components/ClubPage';
import Login from './components/login';
import Signup from './components/signup';

import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar /> {/* Added here to render the navbar */}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/club/:clubName" element={<ClubPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;