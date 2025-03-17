

// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar'; // Imported and now used
import Welcome from './components/WelcomePage';
import Dashboard from './components/Dashboard';
import ClubPage from './components/ClubPage';
import Login from './components/login';
import Signup from './components/signup';
import PresidentDashboard from './components/PresDash';
import Activities from './components/activities';
import UserProfiles from './components/UserProfiles';
import EnrollmentsTable from './components/EnrollmentTable';
import EnrollmentForm from './components/EnrollmentForm';
import { AuthContext, AuthProvider } from './context/AuthContext';

import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/club/:clubName" element={<ClubPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/activities" element={<Activities/>} />
            <Route path="/UserProfiles" element ={<UserProfiles />} />
            <Route path="/EnrollmentTable" element={<EnrollmentsTable />} />
            <Route path="/EnrollmentForm" element={<EnrollmentForm />} />
            <Route
              path="/PresDash"
              element={
                <ProtectedRoute role="president" redirectTo="/login">
                  <PresidentDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// // ProtectedRoute Component to handle role-based route protection
// function ProtectedRoute({ role, redirectTo, children }) {
//   const { user } = useContext(AuthContext); // Access the user from context

//   // Check if the user exists and if the role matches the required one
//   if (!user || user.role !== role) {
//     return <Navigate to={redirectTo} />;
//   }

//   return children;
// }
function ProtectedRoute({ role, redirectTo, children }) {
  const { user } = useContext(AuthContext); // Access user from context
  console.log('User in ProtectedRoute:', user); // Log user object

  if (!user || user.role !== role) {
    console.log('Redirecting to:', redirectTo); // Log redirection path
    return <Navigate to={redirectTo} />;
  }

  return children;
}


export default App;
