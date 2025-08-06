// LevelOverview.jsx
// This component visualizes the learner's current butterfly phase (term progress)
// and shows a horizontal scroll of subject-specific progress bars.

export default function LevelOverview() {
  // Simulated academic data
  const currentTerm = 2; // Term 2 out of 4
  const termProgress = 65; // Overall progress through the current term (in %)

  // Subject-specific progress (can be fetched from backend later)
  const subjects = [
    { name: 'Math', progress: 80 },
    { name: 'English', progress: 60 },
    { name: 'Science', progress: 45 },
    { name: 'Life Orientation', progress: 90 },
  ];

  // Butterfly life cycle phases
  const phases = ['Egg', 'Caterpillar', 'Chrysalis', 'Butterfly'];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      {/* Section Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Level Progression Overview</h2>

      {/* Two-column layout: left = phase, right = subject progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Butterfly Phase Progress */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Growth Phase</h2>
          <p className="text-gray-600 mb-4">
            You are currently in the <strong>{phases[currentTerm - 1]}</strong> phase.
          </p>

          {/* Segmented Progress Bar */}
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
            {/* Gradient fill showing current term progress */}
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-pink-400 transition-all duration-500"
              style={{ width: `${termProgress}%` }}
            ></div>

            {/* Phase markers at 0%, 25%, 50%, 75%, and 100% */}
            {[0, 25, 50, 75, 100].map((pos, i) => (
              <div
                key={i}
                className="absolute top-0 h-full border-l-2 border-white"
                style={{ left: `${pos}%` }}
              ></div>
            ))}
          </div>

          {/* Remaining progress message */}
          <p className="text-sm text-gray-500">
            {100 - termProgress}% left until you reach the <strong>{phases[currentTerm]}</strong> phase.
          </p>
        </div>

        {/* Right Column: Subject Progress Scroll */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Subject Progress</h2>

          {/* Horizontal scroll of subject cards */}
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {subjects.map((subject, i) => (
              <div
                key={i}
                className="min-w-[140px] bg-white/70 p-3 rounded-lg shadow-sm flex-shrink-0"
              >
                {/* Subject name */}
                <p className="text-sm font-medium text-gray-700 mb-1 text-center">
                  {subject.name}
                </p>

                {/* Subject progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>

                {/* Progress percentage */}
                <p className="text-xs text-gray-500 mt-1 text-center">
                  {subject.progress}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}