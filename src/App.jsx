import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header, Footer } from './components';
import { StudentListPage, AddNewStudent, StudentDetailSheet, CourseHistory, EditStudent, LogIn } from './containers';
import './App.css';
// A wrapper component to handle conditional rendering
const AppContent = () => {
  const location = useLocation();
  // Initialize isLoggedIn based on localStorage to prevent reset on refresh
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Sync login status with localStorage changes (e.g., across tabs)
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };

    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token'); // Clear token if used
  };

  // ProtectedRoute component
  const ProtectedRoute = ({ children }) => {
    // Avoid redirecting on initial render if token exists
    const hasToken = localStorage.getItem('token');
    if (!isLoggedIn && !hasToken) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Hide Header on login page
  const showHeader = location.pathname !== '/login';

  return (
    <div className="App">
      {showHeader && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      <div className="content">
        <Routes>
          <Route path="/login" element={<LogIn onLogin={handleLogin} />} />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute>
                <StudentListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <StudentListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-new-student"
            element={
              <ProtectedRoute>
                <AddNewStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-detail/:studentId"
            element={
              <ProtectedRoute>
                <StudentDetailSheet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course-history/:studentId"
            element={
              <ProtectedRoute>
                <CourseHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-student/:studentId"
            element={
              <ProtectedRoute>
                <EditStudent />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;