import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css'; // Reuse the same CSS for consistency

const Admin = () => {
  return (
    <div className="chapters-container">
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Admin Actions</h2>
        <ul className="chapters-list">
          <li className="chapter-item">
            <Link to="/chapters" className="details-link">Manage Chapters</Link>
          </li>
          <li className="chapter-item">
            <Link to="/users" className="details-link">Manage Users</Link>
          </li>
          <li className="chapter-item">
            <Link to="/settings" className="details-link">Settings</Link>
          </li>
        </ul>
        <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
      </section>
    </div>
  );
};

export default Admin;