// // src/components/PrivateRoute.js
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from '../context/AuthContext'; // Import useAuth

// const PrivateRoute = ({ children }) => {
//   const { user } = useAuth(); // Check user from context
//   return user ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" />; // Redirect to dashboard if role doesn't match
  }

  return children; // Allow access if authenticated and role matches
};

export default PrivateRoute;