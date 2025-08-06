// ==============================
// 📄 LessonExplorer.jsx
// ==============================
// This component displays a mock lesson structure with a sidebar and content panel.
// It uses static data for now, but can be replaced with API integration later.
// ==============================

import React, { useState } from 'react';

// 🧩 Local Components
import SidebarTree from '../../../components/navigation/SidebarTree';
import ChapterContent from '../../../components/chapters/ChapterContent';

// 🧪 Mock lesson data (replace with real API data later)
const mockLesson = {
  title: 'Natural Sciences Grade 7',
  terms: [
    {
      term: 1,
      topics: [
        {
          title: 'Photosynthesis',
          lessons: [
            {
              title: 'Intro to Photosynthesis',
              chapters: [
                { title: 'What is Photosynthesis?', content: 'Photosynthesis is...' },
                { title: 'Role of Sunlight', content: 'Sunlight provides energy...' },
              ],
            },
          ],
        },
      ],
    },
    {
      term: 2,
      topics: [
        {
          title: 'Ecosystems',
          lessons: [
            {
              title: 'Food Chains',
              chapters: [
                { title: 'Producers and Consumers', content: 'Producers make food...' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

/**
 * LessonExplorer renders a sidebar of terms/topics/lessons and shows
 * chapter content when a chapter is selected.
 */
export default function LessonExplorer() {
  const [selectedChapter, setSelectedChapter] = useState(null);

  return (
    <div className="flex h-[80vh] border rounded overflow-hidden shadow">
      {/* 📚 Sidebar with lesson structure */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">{mockLesson.title}</h2>
        <SidebarTree
          data={mockLesson.terms}
          onSelectChapter={setSelectedChapter}
        />
      </div>

      {/* 📖 Chapter Content Panel */}
      <div className="w-2/3 p-6 overflow-y-auto">
        {selectedChapter ? (
          <ChapterContent chapter={selectedChapter} />
        ) : (
          <p className="text-gray-500">Select a chapter to view its content.</p>
        )}
      </div>
    </div>
  );
}