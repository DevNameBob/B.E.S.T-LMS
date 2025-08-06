import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChapterEditor from '../../../components/chapters/ChapterEditor';
import SidebarTree from '../../../components/navigation/SidebarTree';
import TermEditorModal from '../../../components/Editors/TermEditorModal';
import TopicEditorModal from '../../../components/Editors/TopicEditorModal';
import LessonEditorModal from '../../../components/Editors/LessonEditorModal';

export default function LessonExplorerInline({ lessonId }) {
  const [lesson, setLesson] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [chapterContext, setChapterContext] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [editingChapter, setEditingChapter] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [modal, setModal] = useState(null);

  const fetchLesson = async () => {
    try {
      const res = await axios.get(`/api/lessons/${lessonId}/structure`);
      setLesson(res.data);
    } catch (err) {
      console.error('❌ Failed to load lesson structure:', err);
    }
  };

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  const handleAddChapter = async (chapter) => {
    try {
      const { termIndex, topicIndex, lessonIndex } = chapterContext;
      const url = `/api/lessons/${lessonId}/term/${termIndex}/topic/${topicIndex}/lesson/${lessonIndex}/chapter`;
      await axios.post(url, chapter);
      setShowEditor(false);
      setChapterContext(null);
      localStorage.removeItem('chapterDraft');
      fetchLesson();
    } catch (err) {
      console.error('❌ Failed to save chapter:', err);
    }
  };

  const handleUpdateChapter = async (chapter) => {
    try {
      const { termIndex, topicIndex, lessonIndex, chapterIndex } = selectedItem || {};
      if (typeof chapterIndex !== 'number') {
        console.warn('⚠️ Missing chapterIndex in selectedItem');
        return;
      }
      const url = `/api/lessons/${lessonId}/term/${termIndex}/topic/${topicIndex}/lesson/${lessonIndex}/chapter/${chapterIndex}`;
      await axios.patch(url, chapter);
      setShowEditor(false);
      setEditingChapter(null);
      localStorage.removeItem('chapterDraft');
      fetchLesson();
    } catch (err) {
      console.error('❌ Failed to update chapter:', err);
    }
  };

  const handleStartAddChapter = (termIndex, topicIndex, lessonIndex) => {
    setChapterContext({ termIndex, topicIndex, lessonIndex });
    setShowEditor(true);
    setEditingChapter(null);
    setActiveChapter(null);
  };

  const handleStartAddTerm = () => {
  console.log('Add Term clicked');
  setModal({
    mode: 'create',
    type: 'term',
    indexes: {}, // no indexes needed for root-level term
    initialData: { title: '', summary: '', assessment: [] }
  });
};

const handleStartAddTopic = (termIndex) => {
  setModal({
    mode: 'create',
    type: 'topic',
    indexes: { termIndex },
    initialData: { title: '', summary: '', assessment: [] }
  });
};

const handleStartAddLesson = (termIndex, topicIndex) => {
  setModal({
    mode: 'create',
    type: 'lesson',
    indexes: { termIndex, topicIndex },
    initialData: { title: '', summary: '', assessment: [] }
  });
};


  const handleEditChapter = (item, indexes) => {
    setEditingChapter(item);
    setSelectedItem({ type: 'chapter', item, ...indexes });
    setShowEditor(true);
    setActiveChapter(null);
  };

  const handlePreviewChapter = (item) => {
    setActiveChapter(item);
    setShowEditor(false);
    setEditingChapter(null);
  };

  const exitEditor = () => {
    setShowEditor(false);
    setEditingChapter(null);
    setChapterContext(null);
    localStorage.removeItem('chapterDraft');
  };

  const handleDelete = async () => {
    const { type, indexes } = modal;
    let url = '';

    if (type === 'term') {
      url = `/api/lessons/${lessonId}/term/${indexes.termIndex}`;
    } else if (type === 'topic') {
      url = `/api/lessons/${lessonId}/term/${indexes.termIndex}/topic/${indexes.topicIndex}`;
    } else if (type === 'lesson') {
      url = `/api/lessons/${lessonId}/term/${indexes.termIndex}/topic/${indexes.topicIndex}/lesson/${indexes.lessonIndex}`;
    } else if (type === 'chapter') {
      url = `/api/lessons/${lessonId}/term/${indexes.termIndex}/topic/${indexes.topicIndex}/lesson/${indexes.lessonIndex}/chapter/${indexes.chapterIndex}`;
    }

    try {
      await axios.delete(url);
      setModal(null);
      fetchLesson();
    } catch (err) {
      console.error('❌ Failed to delete:', err);
    }
  };

  const handleSave = async (data) => {
    const { mode, type, indexes } = modal;
    let url = '';

    if (type === 'term') {
      url = mode === 'edit'
        ? `/api/lessons/${lessonId}/term/${indexes.termIndex}`
        : `/api/lessons/${lessonId}/term`;
    } else if (type === 'topic') {
      url = mode === 'edit'
        ? `/api/lessons/${lessonId}/term/${indexes.termIndex}/topic/${indexes.topicIndex}`
        : `/api/lessons/${lessonId}/term/${indexes.termIndex}/topic`;
    } else if (type === 'lesson') {
      url = mode === 'edit'
        ? `/api/lessons/${lessonId}/term/${indexes.termIndex}/topic/${indexes.topicIndex}/lesson/${indexes.lessonIndex}`
        : `/api/lessons/${lessonId}/term/${indexes.termIndex}/topic/${indexes.topicIndex}/lesson`;
    }

    try {
      const method = mode === 'edit' ? 'PATCH' : 'POST';
      await axios({ method, url, data });
      setModal(null);
      fetchLesson();
    } catch (err) {
      console.error(`❌ Failed to ${mode} ${type}:`, err);
    }
  };

  if (!lesson) {
    return <p className="text-gray-500">Loading lesson structure...</p>;
  }

  return (
    <div className="flex h-[60vh] border rounded overflow-hidden">
      {/* 📚 Sidebar */}
      <div className="w-1/3 bg-gray-50 p-4 overflow-y-auto border-r">
        <SidebarTree
        data={lesson.terms}
        courseId={lesson._id}
        refresh={fetchLesson}
        onAddChapter={handleStartAddChapter}
        onSelectItem={setSelectedItem}
        onAddTerm={handleStartAddTerm}
        onAddTopic={handleStartAddTopic}
        onAddLesson={handleStartAddLesson}
      />
      </div>

      {/* 📝 Right Panel */}
      <div className="w-3/4 p-6 overflow-y-auto">
        {showEditor ? (
          <>
            <ChapterEditor
              onSave={editingChapter ? handleUpdateChapter : handleAddChapter}
              initialData={editingChapter || { title: '', summary: '', content: '', xp: 10, assessment: [] }}
            />
            <button
              onClick={exitEditor}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              ← Exit Editor
            </button>
          </>
        ) : activeChapter ? (
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold">{activeChapter.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: activeChapter.content }} />
            <button
              onClick={() => setActiveChapter(null)}
              className="mt-6 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              ← Exit Chapter View
            </button>
          </div>
        ) : selectedItem ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{selectedItem.item.title}</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {selectedItem.item.summary || 'No summary provided.'}
            </p>

            {/* 📋 Assessment Preview */}
            {selectedItem.item.assessment?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800">📋 Assessment</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {selectedItem.item.assessment.map((q, idx) => (
                    <li key={idx}>
                      <strong>Q{idx + 1} ({q.type}):</strong> {q.question}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {['term', 'topic', 'lesson'].includes(selectedItem.type) && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() =>
                    setModal({
                      mode: 'edit',
                      type: selectedItem.type,
                      indexes: selectedItem.indexes,
                      initialData: selectedItem.item,
                    })
                  }
                  className="px-4 py-2 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit {selectedItem.type}
                </button>
                <button
                  onClick={() =>
                    setModal({
                      mode: 'delete',
                      type: selectedItem.type,
                      indexes: selectedItem.indexes,
                    })
                  }
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete {selectedItem.type}
                </button>
              </div>
            )}

            {selectedItem.type === 'chapter' && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handlePreviewChapter(selectedItem.item)}
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Start Chapter
                </button>
                <button
                  onClick={() => handleEditChapter(selectedItem.item, selectedItem)}
                  className="px-4 py-2 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit Chapter
                </button>
                <button
                  onClick={() =>
                    setModal({
                      mode: 'delete',
                      type: 'chapter',
                      indexes: selectedItem.indexes,
                    })
                  }
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete Chapter
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Select a term, topic, lesson, or chapter to view its summary.</p>
        )}
      </div>

      {modal?.mode === 'create' || modal?.mode === 'edit' ? (
      <>
        {modal.type === 'term' && (
          <TermEditorModal
            initialData={modal.initialData || {}}
            onClose={() => setModal(null)}
            onSubmit={(data) => handleSave({ ...data })}
          />
        )}
        {modal.type === 'topic' && (
          <TopicEditorModal
            initialData={modal.initialData || {}}
            onClose={() => setModal(null)}
            onSubmit={(data) => handleSave({ ...data })}
          />
        )}
        {modal.type === 'lesson' && (
          <LessonEditorModal
            initialData={modal.initialData || {}}
            onClose={() => setModal(null)}
            onSubmit={(data) => handleSave({ ...data })}
          />
        )}
      </>
    ) : null}

      {/* Modal: Confirm Delete */}
      {modal?.mode === 'delete' && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded max-w-md w-full space-y-4">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete this {modal.type}? This will also remove all nested items underneath it.
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setModal(null)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}