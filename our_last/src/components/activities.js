import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Activities.css'; // Import the CSS file

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/activities');
        setActivities(response.data); // Assuming the response is an array of activities
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError('Failed to load activities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error state if any
  }

  return (
    <div className="activities-container">
      <h1>Activities</h1>
      <section>
        <h2>Recent Activities</h2>
        {activities.length > 0 ? (
          <ul className="activities-list">
            {activities.map((activity) => (
              <li key={activity.id} className="activity-item">
                <div className="activity-header">
                  <strong>{activity.title}</strong>
                  <span className="activity-date">{new Date(activity.event_date).toLocaleDateString()}</span>
                </div>
                <p className="activity-description">{activity.description}</p>
                <p className="activity-chapter">Chapter ID: {activity.chapter_id}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No activities available.</p>
        )}
        <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
      </section>
    </div>
  );
};

export default Activities;