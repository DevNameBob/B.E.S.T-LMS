// Dashboard.jsx
// The main landing page for learners after login.
// Combines several key components: welcome message, navigation tabs, progress overview, recent classes, and calendar.

import WelcomePanel from '../../components/WelcomePanel';       // Personalized greeting + announcements
import TopTabs from '../../components/TopTabs';                 // Horizontal tab navigation
import LevelOverview from '../../components/LevelOverview';     // Butterfly phase + subject progress
import RecentlyAccessed from '../../components/RecentlyAccessed'; // Recently opened classes
import MiniCalendar from '../../components/MiniCalendar';       // Current month calendar

export default function Dashboard() {
  return (
    <div>
      {/* Top gradient welcome block with rotating announcements */}
      <WelcomePanel />

      {/* Centered tab navigation (Dashboard, Classes, etc.) */}
      <TopTabs />

      {/* Two-column layout: butterfly phase + subject progress */}
      <LevelOverview />

      {/* Grid of recently accessed classes */}
      <RecentlyAccessed />

      {/* Visual calendar for the current month */}
      <MiniCalendar />
    </div>
  );
}