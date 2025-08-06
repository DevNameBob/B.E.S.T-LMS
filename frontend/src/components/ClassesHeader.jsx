import GradientBlock from './GradientBlock'; // ✅ Import reusable wrapper

export default function ClassesHeader({ overallProgress = 68, subjects = [], currentTerm = 2 }) {
  const phases = ['🥚 Egg', '🐛 Caterpillar', '🐚 Chrysalis', '🦋 Butterfly'];

  return (
    <GradientBlock>
      {/* Page title */}
      <h1 className="text-3xl font-bold text-center mb-4">Your Classes</h1>

      {/* Butterfly phase label */}
      <p className="text-center text-white/90 mb-2">
        You are currently in the <strong>{phases[currentTerm - 1]}</strong> phase.
      </p>

      {/* Segmented progress bar */}
      <div className="relative h-4 bg-white/30 rounded-full overflow-hidden mb-2">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-pink-400 transition-all duration-500"
          style={{ width: `${overallProgress}%` }}
        ></div>
        {[0, 25, 50, 75, 100].map((pos, i) => (
          <div
            key={i}
            className="absolute top-0 h-full border-l-2 border-white/70"
            style={{ left: `${pos}%` }}
          ></div>
        ))}
      </div>

      {/* Completion message */}
      <p className="text-center text-sm text-white/90">
        {100 - overallProgress}% left to complete your classes this year.
      </p>

      {/* Mini subject scroll */}
      <div className="mt-4 overflow-x-auto pb-2">
        <div className="flex space-x-4">
          {subjects.map((subject, i) => (
            <div
              key={i}
              className="min-w-[120px] bg-white/30 p-3 rounded-lg shadow-sm flex-shrink-0"
            >
              <p className="text-sm font-medium text-white mb-1 text-center">{subject.name}</p>
              <div className="w-full bg-white/40 rounded-full h-2">
                <div
                  className="bg-white h-full rounded-full"
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GradientBlock>
  );
}