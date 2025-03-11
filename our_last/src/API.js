// src/api/api.js
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Fetch all users
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

// Fetch a single user by username
export const getUserByUsername = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// Register a new user
export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
};

// Sign in a user and get JWT token
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in user:", error);
    return null;
  }
};

// Example of sending notification via backend API
export const sendNotification = async (message) => {
  try {
    const response = await fetch(`${BASE_URL}/notify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending notification:", error);
    return null;
  }
};

// AuthService.js
export const saveToken = (token) => {
    localStorage.setItem("token", token);
  };
  
  export const getToken = () => {
    return localStorage.getItem("token");
  };
  
