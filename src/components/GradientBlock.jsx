// GradientBlock.jsx
// A reusable wrapper for top-level gradient blocks (e.g. WelcomePanel, ClassesHeader)
// Includes 16 glowing, floating butterflies — 2 per zone, spaced apart and locked on first render

import { useMemo } from 'react';

export default function GradientBlock({ children }) {
  // 🧠 Generate butterfly data once on mount using useMemo
  const butterflies = useMemo(() => {
    return [...Array(8)].flatMap((_, zoneIndex) => {
      const zoneWidth = 100 / 8;
      return [0, 1].map((offset) => {
        const left = zoneIndex * zoneWidth + Math.random() * (zoneWidth - 10);
        const topBase = offset === 0 ? 5 : 25; // upper or lower half of the zone
        const top = Math.random() * 10 + topBase;
        const rotation = Math.random() * 360;
        const size = Math.random() * 20 + 20;
        const delay = Math.random() * 2;

        return { top, left, rotation, size, delay, key: `${zoneIndex}-${offset}` };
      });
    });
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-sky-400 via-rose-300 to-pink-400 rounded-xl p-6 min-h-[220px] mb-8 shadow-lg text-white overflow-hidden">
      
      {/* 🦋 Render butterflies with stable positions and spacing */}
      {butterflies.map(({ top, left, rotation, size, delay, key }) => (
        <div
          key={key}
          className="absolute pointer-events-none"
          style={{
            top: `${top}px`,
            left: `${left}%`,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-float glow-butterfly"
            style={{
              width: `${size}px`,
              opacity: 0.35,
              mixBlendMode: 'screen',
              animationDelay: `${delay}s`,
            }}
          >
            {/* Butterfly wings and body */}
            <path d="M50 50 C30 20, 10 40, 30 60" fill="#fbb6ce" stroke="#f472b6" strokeWidth="1" />
            <path d="M50 50 C25 60, 25 80, 40 70" fill="#fcd5ce" stroke="#f472b6" strokeWidth="1" />
            <path d="M50 50 C70 20, 90 40, 70 60" fill="#a0d8ef" stroke="#60a5fa" strokeWidth="1" />
            <path d="M50 50 C75 60, 75 80, 60 70" fill="#cce5ff" stroke="#60a5fa" strokeWidth="1" />
            <rect x="48.5" y="45" width="3" height="10" rx="1.5" fill="#444" />
            <line x1="50" y1="45" x2="47" y2="40" stroke="#444" strokeWidth="1" />
            <line x1="50" y1="45" x2="53" y2="40" stroke="#444" strokeWidth="1" />
            <circle cx="49" cy="47" r="0.6" fill="#fff" />
            <circle cx="51" cy="47" r="0.6" fill="#fff" />
          </svg>
        </div>
      ))}

      {/* 📦 Main content passed from parent component */}
      {children}
    </div>
  );
}