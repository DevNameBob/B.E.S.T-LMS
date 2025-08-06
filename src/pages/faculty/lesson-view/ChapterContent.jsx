// ==============================
// 📄 ChapterContent.jsx
// ==============================
// This component displays a chapter's title, summary, and a "Start Chapter" button.
// It can be used in preview panels or full views.
// ==============================

import React from 'react';

/**
 * Displays a chapter preview with title, summary, and a call-to-action button.
 *
 * Props:
 * - chapter: object containing { title, summary }
 */
export default function ChapterContent({ chapter }) {
  return (
    <div className="space-y-4">
      {/* 🏷️ Chapter Title */}
      <h2 className="text-xl font-semibold">{chapter.title}</h2>

      {/* 📄 Chapter Summary */}
      <p className="text-gray-700">
        {chapter.summary || 'No summary provided.'}
      </p>

      {/* 🚀 Start Button (can be wired to launch editor or viewer) */}
      <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Start Chapter
      </button>
    </div>
  );
}