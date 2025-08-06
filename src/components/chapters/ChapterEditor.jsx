// ==============================
// 📄 ChapterEditor.jsx
// ==============================
// Renders a complete editor for creating or editing a chapter.
// Includes:
// - Title, Summary, XP input
// - Rich text editor (Tiptap)
// - Assessment builder (multiple choice quiz)
// ==============================

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import AssessmentBuilderModal from '../modals/AssessmentBuilderModal';

export default function ChapterEditor({ onSave, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [summary, setSummary] = useState(initialData.summary || '');
  const [xp, setXp] = useState(initialData.xp || 10);
  const [questions, setQuestions] = useState(initialData.assessment || []);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);

  const isEditing = !!initialData?.title;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ bulletList: { keepMarks: true }, heading: { levels: [1, 2, 3] } }),
      TextStyle,
      Color.configure({ types: ['textStyle'] }),
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
    ],
    content: initialData.content || '<p>Start writing your chapter...</p>',
  });

  useEffect(() => {
    const saved = localStorage.getItem('chapterDraft');
    if (saved && !isEditing && editor) {
      const draftData = JSON.parse(saved);
      setTitle(draftData.title || '');
      setSummary(draftData.summary || '');
      setXp(draftData.xp || 10);
      setQuestions(draftData.assessment || []);
      editor.commands.setContent(draftData.content || '');
    }
  }, [editor]);

  useEffect(() => {
    if (!isEditing) {
      const draft = {
        title,
        summary,
        content: editor?.getHTML(),
        xp,
        assessment: questions,
      };
      localStorage.setItem('chapterDraft', JSON.stringify(draft));
    }
  }, [title, summary, xp, questions, editor?.getHTML()]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !summary.trim() || !editor || questions.length === 0) {
      alert('Please complete all fields and the assessment before saving.');
      return;
    }

    const chapter = {
      title,
      summary,
      content: editor.getHTML(),
      xp: Number(xp) || 0,
      assessment: questions,
    };

    console.log('💾 Saving chapter:', chapter);
    onSave(chapter);

    if (!isEditing) {
      localStorage.removeItem('chapterDraft');
    }

    setTitle('');
    setSummary('');
    setXp(10);
    setQuestions([]);
    editor.commands.clearContent();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Chapter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <textarea
        placeholder="Chapter Summary (what learners should expect)"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        rows={3}
        required
      />

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">XP Reward:</label>
        <input
          type="number"
          min="0"
          value={xp}
          onChange={(e) => setXp(e.target.value)}
          className="w-24 border px-2 py-1 rounded"
        />
        <span className="text-sm text-gray-500">XP awarded on completion</span>
      </div>

      {/* Toolbar */}
      <div className="space-y-2 border-b pb-3">
        {/* Font */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-semibold text-gray-700 w-20">Font</span>
          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="btn">Bold</button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="btn">Italic</button>
          <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="btn">• List</button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="btn">H1</button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="btn">H2</button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="btn">H3</button>
        </div>

        {/* Color */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-semibold text-gray-700 w-20">Color</span>
          <button type="button" onClick={() => editor.chain().focus().setColor('#e11d48').run()} className="btn text-rose-600">Red</button>
          <button type="button" onClick={() => editor.chain().focus().setColor('#2563eb').run()} className="btn text-blue-600">Blue</button>
          <button type="button" onClick={() => editor.chain().focus().setHighlight().run()} className="btn bg-yellow-200">Highlight</button>
        </div>

        {/* Layout */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-semibold text-gray-700 w-20">Layout</span>
          <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className="btn">Left</button>
          <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className="btn">Center</button>
          <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className="btn">Right</button>
          <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className="btn">Quote</button>
        </div>

        {/* Media */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-semibold text-gray-700 w-20">Media</span>
          <button
            type="button"
            onClick={() => {
              const url = prompt('Image URL');
              if (url) editor.chain().focus().setImage({ src: url }).run();
            }}
            className="btn"
          >
            Image
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            className="btn text-gray-500"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="border rounded p-2 bg-white">
        <EditorContent editor={editor} />
      </div>

      {/* Assessment Builder */}
      <div className="mt-6">
        <h3 className="text-md font-semibold">📋 Chapter Assessment</h3>
        <button
          type="button"
          onClick={() => setShowAssessmentModal(true)}
          className="text-blue-600 hover:underline"
        >
          ✍️ Edit Assessment
        </button>

        {questions.length > 0 && (
          <ul className="mt-2 text-sm text-gray-700 list-disc pl-4">
            {questions.map((q, idx) => (
              <li key={idx}>{q.question}</li>
            ))}
          </ul>
        )}

        <AssessmentBuilderModal
          open={showAssessmentModal}
          onClose={() => setShowAssessmentModal(false)}
          onSave={(newAssessment) => setQuestions(newAssessment)}
          initialData={questions}
        />
      </div>

      {/* 💾 Save Button */}
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Save Chapter
      </button>
    </form>
  );
}