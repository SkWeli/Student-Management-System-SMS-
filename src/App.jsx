import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header, Footer } from './components';
import { StudentListPage, AddNewStudent, StudentDetailSheet, CourseHistory, EditStudent, LogIn } from './containers';

// A wrapper component to handle conditional rendering of the Header
const AppContent = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in (using localStorage as a placeholder)
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  // ProtectedRoute component to guard routes
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  // Hide the Header on the login page
  const showHeader = location.pathname !== '/login';

  return (
    <div className="App">
      {showHeader && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      <div className="container">
        <Routes>
          {/* Default route: Login Page */}
          <Route path="/login" element={<LogIn onLogin={handleLogin} />} />
          {/* Route for Student List Page (protected) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <StudentListPage />
              </ProtectedRoute>
            }
          />
          {/* Route for Add New Student (protected) */}
          <Route
            path="/add-new-student"
            element={
              <ProtectedRoute>
                <AddNewStudent />
              </ProtectedRoute>
            }
          />
          {/* Route for Student Detail Sheet (protected) */}
          <Route
            path="/student-detail/:studentId"
            element={
              <ProtectedRoute>
                <StudentDetailSheet />
              </ProtectedRoute>
            }
          />
          {/* Route for Course History (protected) */}
          <Route
            path="/course-history/:studentId"
            element={
              <ProtectedRoute>
                <CourseHistory />
              </ProtectedRoute>
            }
          />
          {/* Route for Edit Student (protected) */}
          <Route
            path="/edit-student/:studentId"
            element={
              <ProtectedRoute>
                <EditStudent />
              </ProtectedRoute>
            }
          />
          {/* Redirect any unknown routes to login */}
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