// ==============================
// 📄 FacultyTabs.jsx
// ==============================
// Renders tab buttons for the Faculty Dashboard.
// Tabs are conditionally accessible based on user role.
// ==============================

import { LockClosedIcon } from '@heroicons/react/24/solid';

/**
 * @param {string} activeTab - Currently selected tab key
 * @param {function} setActiveTab - Updates selected tab
 * @param {string} role - Current user's role (e.g. 'educator', 'admin')
 */
export default function FacultyTabs({ activeTab, setActiveTab, role }) {
  // 🧭 Define all available tabs with required roles
  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'announcements', label: 'Announcements', roles: ['admin', 'announcer'] },
    { key: 'manage-learners', label: 'Manage Learners', roles: ['admin', 'onboarder'] },
    { key: 'manage-lessons', label: 'Manage Lessons', roles: ['admin', 'contentHead'] },
    { key: 'manage-faculty', label: 'Manage Faculty', roles: ['admin'] },
    { key: 'manage-lms', label: 'Manage LMS', roles: ['admin'] },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tabs.map((tab) => {
        const isAccessible = !tab.roles || tab.roles.includes(role);
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => isAccessible && setActiveTab(tab.key)}
            disabled={!isAccessible}
            className={`group relative px-4 py-1.5 rounded-full text-sm font-medium transition shadow-sm flex items-center gap-1
              ${isAccessible
                ? isActive
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            {/* 🔒 Lock icon for restricted tabs */}
            {!isAccessible && (
              <LockClosedIcon className="w-4 h-4 text-gray-400" />
            )}

            {/* 🏷️ Tab label */}
            {tab.label}

            {/* 💬 Tooltip for restricted tabs */}
            {!isAccessible && tab.roles && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10 whitespace-nowrap">
                Restricted to: {tab.roles.join(', ')}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}