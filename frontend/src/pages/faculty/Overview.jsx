// ==============================
// 📄 Overview.jsx
// ==============================
// This component displays a performance summary for faculty,
// including metrics like rating, hours taught, and feedback.
// ==============================

/**
 * Overview displays a full-width performance summary for faculty.
 * It includes:
 * - A grid of key metrics (rating, hours, engagement, etc.)
 * - A section for recent learner feedback
 */
export default function Overview() {
  // 📊 Performance metrics to display in cards
  const metrics = [
    {
      label: 'Learner Rating',
      value: '4.6 / 5',
      icon: '⭐',
      description: 'Based on 87 learner reviews this term.',
    },
    {
      label: 'Hours Taught',
      value: '18 hrs',
      icon: '⏱️',
      description: 'Total classroom hours this week.',
    },
    {
      label: 'Homework Graded',
      value: '42',
      icon: '📝',
      description: 'Assignments reviewed this week.',
    },
    {
      label: 'Engagement Score',
      value: '91%',
      icon: '📈',
      description: 'Calculated from feedback, attendance, and activity.',
    },
  ];

  // 💬 Recent learner feedback quotes
  const feedback = [
    '“Explains concepts clearly and makes class fun!”',
    '“Would love more visual examples in lessons.”',
    '“Very supportive and always available for questions.”',
  ];

  return (
    <div className="bg-white rounded-xl shadow p-8 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>

      {/* 📊 Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-indigo-50 rounded-lg p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="text-3xl mb-2">{metric.icon}</div>
            <div className="text-2xl font-bold text-indigo-700">{metric.value}</div>
            <div className="text-sm font-medium text-gray-700 mt-1">{metric.label}</div>
            <p className="text-xs text-gray-500 mt-2">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* 💬 Feedback Highlights */}
      <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Learner Feedback</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          {feedback.map((quote, i) => (
            <li key={i} className="border-l-4 border-indigo-400 pl-4 italic">
              “{quote}”
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}