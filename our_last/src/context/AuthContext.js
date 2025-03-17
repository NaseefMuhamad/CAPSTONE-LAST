
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser({
      id: userData.userId,
      role: userData.role,
      token: userData.token,
    });
    // You could also store the token in localStorage or sessionStorage if needed
    localStorage.setItem('token', userData.token); // Optional, if you're using tokens
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Optional, if you're using tokens
  };

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
