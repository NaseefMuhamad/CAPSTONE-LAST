import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EnrollmentTable.css'; // Import the CSS file

const EnrollmentsTable = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/enrollments')
      .then((response) => {
        setEnrollments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching enrollments');
        setLoading(false);
      });
  }, []);

  return (
    <div className="enrollments-table-container">
      <h2>Enrollments</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <table className="enrollments-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Chapter ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment.id}>
                <td>{enrollment.student_id}</td>
                <td>{enrollment.chapter_id}</td>
                <td>
                  <button className="btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EnrollmentsTable;
