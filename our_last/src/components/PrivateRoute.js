// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // Import useAuth

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Check user from context
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;