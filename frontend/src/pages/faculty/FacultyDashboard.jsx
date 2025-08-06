// ==============================
// 📄 FacultyDashboard.jsx
// ==============================
// Main dashboard view for faculty/admin users
// - Maps access level from role
// - Passes both role & level to children
// - Redirects unauthorized users
// ==============================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

// 🧩 Local Components
import FacultyWelcomePanel from './FacultyWelcomePanel';
import FacultyTabs from './FacultyTabs';
import FacultyTabContent from './FacultyTabContent';

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState('');
  const [facultyLevel, setFacultyLevel] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔐 Retrieve role from localStorage
    const storedRole = localStorage.getItem('userRole') || '';
    setRole(storedRole);

    // 🎚️ Map access level
    const roleToLevel = {
      admin: 10,
      faculty: 5,
      educator: 4,
      contentHead: 6,
      announcer: 3,
    };

    const level = roleToLevel[storedRole] || 0;
    setFacultyLevel(level);

    // 🚫 Redirect if user is not authorized
    if (level === 0) {
      navigate('/unauthorized');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🦋 Welcome Panel + Logout */}
      <div className="relative">
        <FacultyWelcomePanel title="Mr." name="WhoWho" />
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-white/80 text-red-600 hover:bg-white text-sm px-3 py-1 rounded-full shadow flex items-center gap-1 transition z-10"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* 🧭 Tab Navigation + Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <FacultyTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          role={role}
        />
        <FacultyTabContent
          activeTab={activeTab}
          role={role}
        />
      </main>
    </div>
  );
}