import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log("Logging in user:", userData);
    setUser({
      id: userData.userId,
      role: userData.role,
      token: userData.token,
    });
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    console.log("User logged out");
    setUser(null);
    localStorage.removeItem('token');
  };

  console.log("AuthProvider rendering, user:", user);
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