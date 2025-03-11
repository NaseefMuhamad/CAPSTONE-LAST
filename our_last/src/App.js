import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/WelcomePage';
import Dashboard from './components/Dashboard';
import ClubPage from './components/ClubPage';
import './styles/App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/club/:clubName" element={<ClubPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;