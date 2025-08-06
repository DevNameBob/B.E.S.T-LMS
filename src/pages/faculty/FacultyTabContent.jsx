// ==============================
// 📄 FacultyTabContent.jsx
// ==============================
// Renders content for the selected tab in the Faculty Dashboard.
// Tabs are restricted based on role-based access.
// ==============================

// 📦 Tab Components
import DashboardTab from './tabs/DashboardTab';
import AnnouncementsTab from './tabs/AnnouncementsTab';
import ManageLearnersTab from './tabs/ManageLearnersTab';
import ManageLessonsTab from './tabs/ManageLessonsTab';
import ManageFacultyTab from './tabs/ManageFacultyTab';
import ManageLmsTab from './tabs/ManageLmsTab';

/**
 * @param {string} activeTab - Currently selected tab key
 * @param {string} role - Current user's role (e.g. 'admin', 'educator')
 */
export default function FacultyTabContent({ activeTab, role }) {
  switch (activeTab) {
    case 'dashboard':
      return <DashboardTab />;

    case 'announcements':
      if (['admin', 'announcer'].includes(role)) return <AnnouncementsTab />;
      break;

    case 'manage-learners':
      if (['admin', 'onboarder'].includes(role)) return <ManageLearnersTab />;
      break;

    case 'manage-lessons':
      if (['admin', 'contentHead'].includes(role)) return <ManageLessonsTab />;
      break;

    case 'manage-faculty':
      if (role === 'admin') return <ManageFacultyTab />;
      break;

    case 'manage-lms':
      if (role === 'admin') return <ManageLmsTab />;
      break;

    default:
      return null;
  }

  // 🔒 Fallback for unauthorized access
  return (
    <div className="p-4 text-center text-gray-500">
      🔒 You don’t have access to this section.
      <br />
      Required role: <strong>{getRequiredRoles(activeTab)}</strong>
    </div>
  );
}

// 🔧 Role definitions per tab (same as tabs config)
function getRequiredRoles(tabKey) {
  const tabRoles = {
    announcements: ['admin', 'announcer'],
    'manage-learners': ['admin', 'onboarder'],
    'manage-lessons': ['admin', 'contentHead'],
    'manage-faculty': ['admin'],
    'manage-lms': ['admin'],
  };
  return tabRoles[tabKey]?.join(', ') || 'No access';
}