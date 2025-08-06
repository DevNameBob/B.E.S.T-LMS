import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';

// Page imports
import LoginPage from './pages/learner/LoginPage';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import Dashboard from './pages/learner/Dashboard';
import Classes from './pages/learner/Classes';
import Timetable from './pages/learner/Timetable';
import Notifications from './pages/learner/Notifications';

export default function App() {
  const location = useLocation();

  // ✅ Set up Axios auth header on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white">
      {/* If on the login page, render it full-screen without padding */}
      {isLoginPage ? (
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      ) : (
        // For all other pages, wrap in main layout
        <main className="p-6 max-w-7xl mx-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </main>
      )}
    </div>
  );
}