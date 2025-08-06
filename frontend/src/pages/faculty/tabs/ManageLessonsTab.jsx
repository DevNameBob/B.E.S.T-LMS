// ==============================
// 📄 ManageLessonsTab.jsx
// ==============================
// This tab allows faculty to:
// - View a list of their lessons
// - Create new lessons
// - Explore lesson structure inline via modal
// ==============================

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LessonExplorerInline from '../lesson-view/LessonExplorerInline'; // ✅ Inline viewer for lesson structure

const ManageLessonsTab = () => {
  const [lessons, setLessons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [form, setForm] = useState({
    title: '',
    subject: '',
    description: '',
    grade: '',
    schedule: '',
  });

  const navigate = useNavigate();

  // 📡 Fetch lessons assigned to the current faculty
  const fetchLessons = async () => {
    try {
      const res = await axios.get('/api/lessons/faculty');
      console.log('📦 Lessons fetched:', res.data);
      setLessons(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch lessons:', err);
    }
  };

  // ➕ Create a new lesson
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/lessons/create', form);
      console.log('✅ Lesson created:', res.data);
      setForm({ title: '', subject: '', description: '', grade: '', schedule: '' });
      setShowModal(false);
      fetchLessons();
    } catch (err) {
      console.error('❌ Failed to create lesson:', err);
    }
  };

  // 🔁 Fetch lessons on mount
  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div className="space-y-6">
      {/* 📋 Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Lessons</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Create Lesson
        </button>
      </div>

      {/* 📄 Lessons Table */}
      <table className="w-full text-sm border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Title</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Schedule</th>
            <th>Learners</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson._id} className="border-t hover:bg-gray-50">
              <td className="p-2">{lesson.title}</td>
              <td>{lesson.subject}</td>
              <td>{lesson.grade}</td>
              <td>{lesson.schedule}</td>
              <td>{lesson.learners?.length || 0}</td>
              <td>
                <button
                  onClick={() => setSelectedLesson(lesson)}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200 text-sm"
                >
                  View Structure
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔍 Lesson Structure Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-5xl h-[80vh] rounded-lg shadow-lg overflow-hidden relative">
            <button
              onClick={() => setSelectedLesson(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">{selectedLesson.title}</h3>
              <a
                href={`/faculty/lessons/view/${selectedLesson._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:underline"
              >
                View Full Page ↗
              </a>
            </div>

            <div className="p-4 h-full overflow-y-auto">
              <LessonExplorerInline lessonId={selectedLesson._id} />
            </div>
          </div>
        </div>
      )}

      {/* ➕ Create Lesson Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4">Create New Lesson</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              {['title', 'subject', 'grade', 'schedule'].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="border px-3 py-2 rounded w-full"
                  required
                />
              ))}
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border px-3 py-2 rounded w-full"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
              >
                Create Lesson
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLessonsTab;