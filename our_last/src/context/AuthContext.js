

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Fetch user profile data from the backend
//   const fetchUserProfile = async (userId) => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
//       return response.data; // Assuming the response contains user profile data (e.g., name, email, role)
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       return null;
//     }
//   };

//   // Login function
//   const login = async (userData) => {
//     console.log("Logging in user:", userData);
    
//     // Fetch the user's profile data
//     const profileData = await fetchUserProfile(userData.userId);
    
//     if (profileData) {
//       // Store user data in state
//       setUser({
//         id: userData.userId,
//         role: userData.role,
//         token: userData.token,
//         name: profileData.name, // Add profile data
//         email: profileData.email, // Add profile data
//       });

//       // Store user data in localStorage
//       localStorage.setItem('user', JSON.stringify({
//         id: userData.userId,
//         role: userData.role,
//         token: userData.token,
//         name: profileData.name,
//         email: profileData.email,
//       }));
//     } else {
//       console.error("Failed to fetch user profile data.");
//     }
//   };

//   // Logout function
//   const logout = () => {
//     console.log("User logged out");
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   // Check for persisted user data on app load
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const userData = JSON.parse(storedUser);
//       setUser(userData);
//     }
//   }, []);

//   console.log("AuthProvider rendering, user:", user);
//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export { AuthContext };

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user profile data from the backend
  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
      console.log("Backend response:", response.data); // Debugging
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Login function
  const login = async (userData) => {
    console.log("Logging in user:", userData);
    
    // Fetch the user's profile data
    const profileData = await fetchUserProfile(userData.userId);
    
    if (profileData) {
      // Store user data in state
      setUser({
        id: userData.userId,
        role: userData.role,
        token: userData.token,
        name: profileData.name,
        email: profileData.email,
      });

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        id: userData.userId,
        role: userData.role,
        token: userData.token,
        name: profileData.name,
        email: profileData.email,
      }));
    } else {
      console.error("Failed to fetch user profile data.");
    }
  };

  // Logout function
  const logout = () => {
    console.log("User logged out");
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check for persisted user data on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      console.log("Restored user data:", userData); // Debugging
      setUser(userData);
    }
  }, []);

  console.log("AuthProvider rendering, user:", user); // Debugging
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext };