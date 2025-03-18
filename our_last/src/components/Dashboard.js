// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const clubs = [
    { name: 'Cybersecurity', path: '/club/cybersecurity' },
    { name: 'DataScience', path: '/club/datascience' },
    { name: 'Robotics', path: '/club/robotics' },
  ];

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="club-buttons">
        {clubs.map((club) => (
          <Link key={club.path} to={club.path} className="club-btn">
            {club.name} Club
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;