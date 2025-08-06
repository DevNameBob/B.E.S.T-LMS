// RecentlyAccessed.jsx
// Displays a grid of recently accessed subjects with timestamps.
// Intended for quick access and visual continuity with the dashboard.

export default function RecentlyAccessed() {
  // Static data for recently accessed subjects
  // You can later replace this with dynamic data from a backend or local storage
  const recentSubjects = [
    { name: 'Math', icon: '', lastAccessed: '2 hours ago' },
    { name: 'English', icon: '', lastAccessed: 'Yesterday' },
    { name: 'Science', icon: '', lastAccessed: '3 days ago' },
    { name: 'Life Orientation', icon: '', lastAccessed: 'Last week' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      {/* Section heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recently Accessed Classes</h2>

      {/* Responsive grid layout: 1 column on mobile, 2 on small screens, 4 on medium+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {recentSubjects.map((subject, i) => (
          <div
            key={i}
            className="bg-white/70 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Placeholder for subject icon (can be replaced with an emoji or SVG later) */}
            <div className="text-3xl mb-2">{subject.icon}</div>

            {/* Subject name */}
            <h3 className="text-lg font-semibold text-gray-800">{subject.name}</h3>

            {/* Last accessed timestamp */}
            <p className="text-sm text-gray-500">Last accessed: {subject.lastAccessed}</p>
          </div>
        ))}
      </div>
    </div>
  );
}