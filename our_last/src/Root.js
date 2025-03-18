// src/Root.js
import React from 'react';
import { AuthProvider } from './context/AuthContext'; // Adjust path if needed
import App from './App';

function Root() {
  console.log("Root rendering");
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default Root;