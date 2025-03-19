import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Assuming AuthContext is used for user data
import '../components/PresidentDash.css';

const PresidentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get user from context (you should have user context in your app)
  
  const [activity, setActivity] = useState({ chapter_id: '', title: '', description: '', event_date: '' });
  const [chapterProgress, setChapterProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();

    // Convert chapter_id to an integer
    const chapterId = parseInt(activity.chapter_id, 10);
    if (isNaN(chapterId)) {
      alert("Chapter ID must be a valid number.");
      return;
    }

    // Create a new activity object with chapter_id as an integer
    const activityWithIntId = {
      ...activity,
      chapter_id: chapterId,
    };

    console.log("Activity being sent:", activityWithIntId); // Debug the payload

    try {
      const response = await axios.post('http://localhost:8080/api/add-activity', activityWithIntId, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("Backend response:", response)
      if (response.status === 200 || response.status === 201) {
        alert('Activity added successfully!');
        setActivity({ chapter_id: '', title: '', description: '', event_date: '' });
        navigate('/activities');
      } else {
        alert('Failed to add activity.');
      }
    } catch (error) {
      console.error('Error adding activity:', error);
      alert(`Error: ${error.response?.data?.message || 'Failed to add activity. Please try again later.'}`);
    }
  };

  useEffect(() => {
    const fetchChapterProgress = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/chapter-progress');
        setChapterProgress(response.data); // Assuming the response is an array of chapters
      } catch (error) {
        console.error('Error fetching chapter progress:', error);
        setError('Failed to load chapter progress. Please try again later');
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'president') {
      fetchChapterProgress();
    } else {
      setError('You are not authorized to view this page.');
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error state if any
  }

  return (
    <div className="president-dashboard">
      <h1>President Dashboard</h1>
      <section>
        <h2>Add Chapter Activity</h2>
        <form onSubmit={handleAddActivity}>
          <div>
            <label>Chapter ID:</label>
            <input
              type="number"
              name="chapter_id"
              value={activity.chapter_id}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={activity.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={activity.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="event_date"
              value={activity.event_date}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add Activity</button>
        </form>
      </section>
      <section>
        <h2>Chapter Progress</h2>
        {chapterProgress.length > 0 ? (
          <ul>
            {chapterProgress.map((chapter, index) => (
              <li key={index}>
                <Link to={`/club/${chapter.name}`}>
                  <strong>{chapter.name}</strong>: {chapter.progress}% complete -{' '}
                  {chapter.lastActivity || 'No recent activity'}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No chapter progress data available.</p>
        )}
        <Link to="/Chapters" className="chapters-link">View All Chapters</Link> <br/>
        <Link to="/dashboard">Back to Dashboard</Link>
      </section>
    </div>
  );
};

export default PresidentDashboard;

// // export default PresidentDashboard;
// // src/components/PresidentDashboard.js
// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext'; // Assuming AuthContext is used for user data
// import '../components/PresidentDash.css';

// const PresidentDashboard = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext); // Get user from context (you should have user context in your app)
  
//   const [activity, setActivity] = useState({ chapter_id:'',title: '', description: '', event_date: '' });
//   const [chapterProgress, setChapterProgress] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setActivity((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddActivity = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/api/add-activity', activity, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       if (response.status === 200) {
//         alert('Activity added successfully!');
//         setActivity({ chapter_id:'',title: '', description: '', event_date: '' });
//         navigate('/dashboard');
//       } else {
//         alert('Failed to add activity.');
//       }
//     } catch (error) {
//       console.error('Error adding activity:', error);
//       alert('Error adding activity, please try again later.');
//     }
//   };

//   useEffect(() => {
//     const fetchChapterProgress = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/chapter-progress');
//         setChapterProgress(response.data); // Assuming the response is an array of chapters
//       } catch (error) {
//         console.error('Error fetching chapter progress:', error);
//         setError('Failed to load chapter progress. Please try again later');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user && user.role === 'president') {
//       fetchChapterProgress();
//     } else {
//       setError('You are not authorized to view this page.');
//       setLoading(false);
//     }
//   }, [user]);

//   if (loading) {
//     return <div>Loading...</div>; // Show loading state
//   }

//   if (error) {
//     return <div>{error}</div>; // Show error state if any
//   }

//   return (
//     <div className="president-dashboard">
//       <h1>President Dashboard</h1>
//       <section>
//         <h2>Add Chapter Activity</h2>
//         <form onSubmit={handleAddActivity}>
//         <div>
//             <label>Chapter ID:</label>
//             <input type="number" name="chapter_id" value={activity.chapter_id} onChange={handleInputChange} required />
//           </div>
//           <div>
//             <label>Title:</label>
//             <input type="text" name="title" value={activity.title} onChange={handleInputChange} required />
//           </div>
//           <div>
//             <label>Description:</label>
//             <textarea name="description" value={activity.description} onChange={handleInputChange} required />
//           </div>
//           <div>
//             <label>Date:</label>
//             <input type="date" name="date" value={activity.date} onChange={handleInputChange} required />
//           </div>
//           <button type="submit">Add Activity</button>
//         </form>
//       </section>
//       <section>
//         <h2>Chapter Progress</h2>
//         {chapterProgress.length > 0 ? (
//           <ul>
//             {chapterProgress.map((chapter, index) => (
//               <li key={index}>
//                 <Link to={`/club/${chapter.name}`}>
//                   <strong>{chapter.name}</strong>: {chapter.progress}% complete -{' '}
//                   {chapter.lastActivity || 'No recent activity'}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No chapter progress data available.</p>
//         )}
//         <Link to="/dashboard">Back to Dashboard</Link>
//       </section>
//     </div>
//   );
// };

// export default PresidentDashboard;
