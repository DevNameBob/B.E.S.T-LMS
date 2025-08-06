// Sidebar.jsx
// A vertical sidebar with gradient styling and navigation links.
// Currently unused in the learner layout, but kept for future use (e.g. admin/faculty views).

import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-sky-400 via-rose-300 to-pink-400 text-white shadow-lg relative overflow-hidden rounded-tr-xl rounded-br-xl">
      
      {/* Decorative pattern overlay using radial gradient dots */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.1)_1px,_transparent_0)] bg-[length:20px_20px] opacity-20 pointer-events-none" />

      {/* Sidebar content container */}
      <div className="relative z-10 p-4">
        {/* App title */}
        <h2 className="text-2xl font-bold mb-6 tracking-wide">📚 My LMS</h2>

        {/* Navigation links */}
        <nav className="space-y-3">
          {/* Dashboard link */}
          <Link
            to="/"
            className="block bg-white/20 backdrop-blur-md px-4 py-3 rounded-lg hover:bg-white/30 transition shadow-sm"
          >
            🏠 Dashboard
          </Link>

          {/* Placeholder links — can be replaced with <Link> when routes are ready */}
          <a
            href="#"
            className="block bg-white/20 backdrop-blur-md px-4 py-3 rounded-lg hover:bg-white/30 transition shadow-sm"
          >
            📘 Courses
          </a>

          <Link
            to="/timetable"
            className="block bg-white/20 backdrop-blur-md px-4 py-3 rounded-lg hover:bg-white/30 transition shadow-sm"
          >
            🗓️ Timetable
          </Link>

          <Link
            to="/notifications"
            className="block bg-white/20 backdrop-blur-md px-4 py-3 rounded-lg hover:bg-white/30 transition shadow-sm"
          >
            📬 Notifications
          </Link>

          <a
            href="#"
            className="block bg-white/20 backdrop-blur-md px-4 py-3 rounded-lg hover:bg-white/30 transition shadow-sm"
          >
            🏆 Leaderboard
          </a>

          <a
            href="#"
            className="block bg-white/20 backdrop-blur-md px-4 py-3 rounded-lg hover:bg-white/30 transition shadow-sm"
          >
            👤 Profile
          </a>
        </nav>
      </div>
    </aside>
  );
}