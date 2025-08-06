// LevelProgress.jsx
// Displays the learner's current level and a progress bar indicating how close they are to the next level.
// Props:
// - level: current level number (default = 1)
// - progress: percentage of progress toward the next level (default = 0)

export default function LevelProgress({ level = 1, progress = 0 }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Title with level number and emoji for visual emphasis */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        🎯 Level {level} Progress
      </h2>

      {/* Progress bar container */}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        {/* Filled portion of the progress bar */}
        <div
          className="bg-indigo-600 h-full transition-all duration-500"
          // The width of this bar is dynamically set based on the progress prop
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Text below the bar showing exact percentage */}
      <p className="text-sm text-gray-600 mt-2">{progress}% complete</p>
    </div>
  );
}