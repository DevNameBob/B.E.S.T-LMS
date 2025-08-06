import { useState } from 'react';

export default function SecondaryTabs({ onTabChange }) {
  const [active, setActive] = useState('subjects');

  const handleClick = (tab) => {
    setActive(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex justify-center mt-6 mb-4">
      <div className="bg-white/10 backdrop-blur-md rounded-full p-1 flex space-x-2 shadow-inner border border-white/40 ring-1 ring-white/30">
        {/* Subjects Tab */}
        <button
          onClick={() => handleClick('subjects')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
            active === 'subjects'
              ? 'bg-pink-500 text-white shadow-md'
              : 'bg-transparent text-white hover:bg-white/20'
          }`}
        >
          <span role="img" aria-label="Subjects">📚</span>
          <span className="inline-block">Subjects</span>
        </button>

        {/* Chat Rooms Tab */}
        <button
          onClick={() => handleClick('chat')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
            active === 'chat'
              ? 'bg-sky-500 text-white shadow-md'
              : 'bg-transparent text-white hover:bg-white/20'
          }`}
        >
          <span role="img" aria-label="Chat Rooms">💬</span>
          <span className="inline-block">Chat Rooms</span>
        </button>
      </div>
    </div>
  );
}