import React from 'react';
import { Link } from 'react-router-dom';
 

function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="hero-section">
        <h1 className="hero-title">Discover Your Passion</h1>
        <p className="hero-subtitle">
          Join a vibrant community of innovators in Cybersecurity, Data Science, and Robotics
        </p>
        <Link to="/dashboard">
          <button className="hero-button">Explore Clubs Now</button>
        </Link>
      </div>
      <div className="welcome-overlay"></div>
      <div className="welcome-features">
        <div className="feature-item">
          <span className="feature-icon">🔒</span>
          <p>Cybersecurity</p>
        </div>
        <div className="feature-item">
          <span className="feature-icon">📊</span>
          <p>Data Science</p>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🤖</span>
          <p>Robotics</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;