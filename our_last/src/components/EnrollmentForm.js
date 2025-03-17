import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EnrollmentForm.css'; // Import the CSS file

const EnrollmentForm = () => {
  const [studentId, setStudentId] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [chapters, setChapters] = useState([]);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch available chapters from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/chapters')
      .then((response) => {
        setChapters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching chapters:', error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId || !chapterId) {
      setMessage('Both fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/enroll', {
        student_id: studentId,
        chapter_id: chapterId,
      });
      setMessage(`Successfully enrolled in chapter ${response.data.enrollmentId}`);
      setIsSubmitted(true);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Something went wrong'}`);
    }
  };

  return (
    <div className="enrollment-form-container">
      {!isSubmitted ? (
        <form className="enrollment-form" onSubmit={handleSubmit}>
          <h2>Enroll in a Chapter</h2>
          <input
            type="number"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID"
            required
          />
          <select
            value={chapterId}
            onChange={(e) => setChapterId(e.target.value)}
            required
          >
            <option value="">Select Chapter</option>
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.name}
              </option>
            ))}
          </select>
          <button type="submit" className="btn">Enroll</button>
          {message && <p className="message">{message}</p>}
        </form>
      ) : (
        <div className="success-message">
          <h2>Success!</h2>
          <p>You have successfully enrolled in the chapter!</p>
        </div>
      )}
    </div>
  );
};

export default EnrollmentForm;
