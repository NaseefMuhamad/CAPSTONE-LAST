import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Club Dashboard</h1>
      <div className="club-buttons">
        <Link to="/club/datascience" className="club-btn">
          Data Science Club
        </Link>
        <Link to="/club/cybersecurity" className="club-btn">
          Cybersecurity Club
        </Link>
        <Link to="/club/robotics" className="club-btn">
          Robotics Club
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;