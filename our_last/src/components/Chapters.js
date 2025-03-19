

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './Chapters.css';

// const Chapters = () => {
//   const [chapters, setChapters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch all chapters
//   const fetchChapters = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/chapters');
//       setChapters(response.data);
//     } catch (error) {
//       console.error('Error fetching chapters:', error);
//       setError('Failed to load chapters. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchChapters();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="chapters-container">
//       <h1>Chapters</h1>
//       <section>
//         <h2>All Chapters</h2>
//         {chapters.length > 0 ? (
//           <ul className="chapters-list">
//             {chapters.map((chapter) => (
//               <li key={chapter.id} className="chapter-item">
//                 <div className="chapter-header">
//                   <strong>{chapter.name}</strong>
//                 </div>
//                 <p className="chapter-description">{chapter.description}</p>
//                 <p className="chapter-progress">Progress: {chapter.progress}%</p>
//                 {chapter.data && (
//                   <div className="chapter-data">
//                     <h3>Club Data:</h3>
//                     <pre>{JSON.stringify(chapter.data, null, 2)}</pre>
//                   </div>
//                 )}
//                 <Link to={`/chapters/${chapter.name}`} className="details-link">View Details</Link>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No chapters available.</p>
//         )}
//         {/* Add a back link to the President Dashboard */}
//         <Link to="/PresDash" className="back-link">Back to President Dashboard</Link>
//       </section>
//     </div>
//   );
// };

// export default Chapters;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Chapters.css';

const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all chapters
  const fetchChapters = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/chapters');
      setChapters(response.data);
    } catch (error) {
      console.error('Error fetching chapters:', error);
      setError('Failed to load chapters. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="chapters-container">
      <h1>Chapters</h1>
      <section>
        <h2>All Chapters</h2>
        {chapters.length > 0 ? (
          <ul className="chapters-list">
            {chapters.map((chapter) => {
              const chapterData = typeof chapter.data === 'string' ? JSON.parse(chapter.data) : chapter.data;
              return (
                <li key={chapter.id} className="chapter-item">
                  <div className="chapter-header">
                    <strong>{chapter.name}</strong>
                  </div>
                  <p className="chapter-description">{chapter.description}</p>
                  <p className="chapter-progress">Progress: {chapter.progress}%</p>
                  {chapterData && (
                    <div className="chapter-data">
                      <h3>Club Data:</h3>
                      {chapterData.quiz && (
                        <div className="quiz-section">
                          <h4>Quiz:</h4>
                          <p><strong>Question:</strong> {chapterData.quiz.question}</p>
                          <ul>
                            {chapterData.quiz.options.map((option) => (
                              <li key={option.id}>
                                <strong>{option.id}:</strong> {option.text}
                              </li>
                            ))}
                          </ul>
                          <p><strong>Correct Answer:</strong> {chapterData.quiz.correctAnswer}</p>
                        </div>
                      )}
                      {chapterData.tips && (
                        <div className="tips-section">
                          <h4>Tips:</h4>
                          <ul>
                            {chapterData.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {chapterData.threats && (
                        <div className="threats-section">
                          <h4>Threats:</h4>
                          <ul>
                            {chapterData.threats.map((threat, index) => (
                              <li key={index}>{threat}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {chapterData.leaderboard && (
                        <div className="leaderboard-section">
                          <h4>Leaderboard:</h4>
                          <ul>
                            {chapterData.leaderboard.map((entry, index) => (
                              <li key={index}>{entry}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  <Link to="/Admin" className="back-link">Go to Admin Page</Link>
                  <Link to={`/chapters/${chapter.name}`} className="details-link">View Details</Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No chapters available.</p>
        )}
        <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
      </section>
    </div>
  );
};

export default Chapters;