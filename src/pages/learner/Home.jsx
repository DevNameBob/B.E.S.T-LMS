// Home.jsx
// A compact version of the dashboard, possibly for mobile or alternate roles.
// Includes level progress, announcements, recent classes, and a calendar widget.

import LevelProgress from '../../components/LevelProgress';           // Displays current level and XP progress
import AnnouncementBanner from '../../components/AnnouncementBanner'; // A simplified announcement block
import RecentlyAccessed from '../../components/RecentlyAccessed';     // Recently opened classes
import CalendarWidget from '../../components/CalendarWidget';         // Compact calendar view

export default function Home() {
  return (
    <div className="p-4 space-y-6">
      {/* Learner's current level and progress bar */}
      <LevelProgress />

      {/* Announcements or updates (simplified version of WelcomePanel) */}
      <AnnouncementBanner />

      {/* Recently accessed classes grid */}
      <RecentlyAccessed />

      {/* Compact calendar widget (possibly a smaller version of MiniCalendar) */}
      <CalendarWidget />
    </div>
  );
}