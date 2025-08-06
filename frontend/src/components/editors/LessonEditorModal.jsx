import React, { useState } from 'react';
import AssessmentBuilderModal from '../modals/AssessmentBuilderModal';

export default function LessonEditorModal({ initialData = {}, onSubmit, onClose }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [summary, setSummary] = useState(initialData.summary || '');
  const [assessment, setAssessment] = useState(initialData.assessment || []);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);

  const handleSave = () => {
    onSubmit({ title, summary, assessment });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded max-w-xl w-full space-y-4">
        <h2 className="text-lg font-semibold">Edit Lesson</h2>
        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          rows={3}
        />

        <button
          type="button"
          onClick={() => setShowAssessmentModal(true)}
          className="text-sm text-indigo-600 hover:underline"
        >
          ✍️ Edit Assessment
        </button>

        <AssessmentBuilderModal
          open={showAssessmentModal}
          initialData={assessment}
          onClose={() => setShowAssessmentModal(false)}
          onSave={setAssessment}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}