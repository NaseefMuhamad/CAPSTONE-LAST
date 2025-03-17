// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './UserProfiles.css'; // Import the CSS file

// const UserProfiles = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/users'); // Adjust the endpoint as needed
//         setUsers(response.data); // Assuming the response is an array of users
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         setError('Failed to load user profiles. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Show loading state
//   }

//   if (error) {
//     return <div>{error}</div>; // Show error state if any
//   }

//   return (
//     <div className="user-profiles-container">
//       <h1>User Profiles</h1>
//       <section>
//         <h2>All Users</h2>
//         {users.length > 0 ? (
//           <ul className="user-profiles-list">
//             {users.map((user) => (
//               <li key={user.id} className="user-profile-item">
//                 <div className="user-profile-details">
//                   <h3>{user.name}</h3>
//                   <p><strong>Role:</strong> {user.role}</p>
//                   <p><strong>Email:</strong> {user.email}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No users available.</p>
//         )}
//         <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
//       </section>
//     </div>
//   );
// };

// export default UserProfiles; 

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  // Import AuthContext
import './UserProfiles.css'; // Import the CSS file

const UserProfiles = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user's data from context
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${user.id}`); // Fetch the logged-in user's profile
        setProfile(response.data); // Set the profile data
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load user profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserProfile(); // Fetch user profile only if a user is logged in
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error state if any
  }

  if (!profile) {
    return <div>No profile data available.</div>; // If no profile found
  }

  return (
    <div className="user-profile-container">
      <h1>{profile.name}'s Profile</h1>
      <section>
        <div className="user-profile-details">
          <h2>{profile.name}</h2>
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {/* Add other profile fields here if needed */}
        </div>
        <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
      </section>
    </div>
  );
};

export default UserProfiles;
