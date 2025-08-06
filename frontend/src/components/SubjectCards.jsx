import { useState } from 'react';

const subjects = [
  {
    name: 'Math',
    progress: 80,
    description: 'Master numbers, patterns, and problem-solving skills.',
    lastCompleted: 'Algebra Basics',
    nextTopic: 'Quadratic Equations',
    currentTopic: 'Linear Equations',
    butterflyStage: '🦋 Chrysalis',
    timeSpent: '2h 15m',
    streak: 3,
  },
  {
    name: 'English',
    progress: 60,
    description: 'Explore language, literature, and communication.',
    lastCompleted: 'Essay Structure',
    nextTopic: 'Poetry Analysis',
    currentTopic: 'Narrative Writing',
    butterflyStage: '🐛 Caterpillar',
    timeSpent: '1h 40m',
    streak: 2,
  },
  {
    name: 'Science',
    progress: 45,
    description: 'Discover the wonders of biology, chemistry, and physics.',
    lastCompleted: 'States of Matter',
    nextTopic: 'Photosynthesis',
    currentTopic: 'Chemical Reactions',
    butterflyStage: '🦋 Egg',
    timeSpent: '55m',
    streak: 1,
  },
  {
    name: 'Life Orientation',
    progress: 90,
    description: 'Grow in self-awareness, health, and social responsibility.',
    lastCompleted: 'Healthy Relationships',
    nextTopic: 'Mental Wellness',
    currentTopic: 'Personal Values',
    butterflyStage: '🦋 Butterfly',
    timeSpent: '3h 10m',
    streak: 5,
  },
];

export default function SubjectCards({ onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {subjects.map((subject, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect && onSelect(subject)}
            className={`cursor-pointer bg-white rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-lg relative overflow-hidden ${
              hovered === i ? 'h-64' : 'h-44'
            }`}
          >
            {/* Subject name */}
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{subject.name}</h2>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${subject.progress}%` }}
              ></div>
            </div>

            {/* Non-hover content */}
            {hovered !== i && (
              <div className="text-sm text-gray-700 space-y-1">
                <p>✅ <strong>Last Completed:</strong> {subject.lastCompleted}</p>
                <p>🔜 <strong>Next:</strong> {subject.nextTopic}</p>
              </div>
            )}

            {/* Hover overlay */}
            {hovered === i && (
              <div className="absolute inset-0 bg-white/95 p-4 rounded-xl shadow-inner z-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-md font-bold text-gray-800 mb-1">{subject.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{subject.description}</p>

                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>🦋 <strong>Progression:</strong> {subject.butterflyStage}</li>
                    <li>📚 <strong>Current Topic:</strong> {subject.currentTopic}</li>
                    <li>🔥 <strong>Streak:</strong> {subject.streak}-day</li>
                    <li>🕒 <strong>Time Spent:</strong> {subject.timeSpent}</li>
                  </ul>
                </div>

                {/* Detailed progress bar */}
                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mt-3">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-pink-400 transition-all duration-500"
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                  {[0, 25, 50, 75, 100].map((pos, j) => (
                    <div
                      key={j}
                      className="absolute top-0 h-full border-l-2 border-white"
                      style={{ left: `${pos}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}