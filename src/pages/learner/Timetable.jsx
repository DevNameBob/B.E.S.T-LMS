// Timetable.jsx
// This page will display the learner's weekly or daily class schedule.
// Can be expanded to include filters, color-coded subjects, or calendar integration.

export default function Timetable() {
  return (
    <div className="p-6">
      {/* Page heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">🗓️ Your Timetable</h1>

      {/* Placeholder message or layout */}
      <p className="text-gray-600">
        Your weekly schedule will appear here. You’ll be able to view classes by day, time, and subject.
      </p>

      {/* Future layout ideas:
          - Grid view (Mon–Fri with time slots)
          - Daily agenda view
          - Color-coded subjects
          - Clickable class blocks with room info
      */}
    </div>
  );
}