import { useNavigate, useLocation } from 'react-router-dom';

export default function TopTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  // Define your top-level navigation tabs
  const tabs = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Classes', path: '/classes' },
    { name: 'Timetable', path: '/timetable' },
    { name: 'Notifications', path: '/notifications' },
  ];

  // Handle logout and redirect to login page
  const handleLogout = () => {
    // Clear any stored session data here if needed
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center mb-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`text-sm font-medium px-4 py-2 rounded-full transition ${
              location.pathname === tab.path
                ? 'bg-indigo-500 text-white shadow'
                : 'text-indigo-600 hover:bg-indigo-100'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}