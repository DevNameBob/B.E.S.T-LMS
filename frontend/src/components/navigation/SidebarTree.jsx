import React, { useState } from 'react';

const SidebarTree = ({
  data = [],
  courseId,
  refresh,
  onAddChapter,
  onSelectItem,
  onAddTerm,
  onAddTopic,
  onAddLesson,
}) => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [modal, setModal] = useState(null);

  const isSelected = (type, indexes) =>
    selectedPath &&
    selectedPath.type === type &&
    JSON.stringify(selectedPath.indexes) === JSON.stringify(indexes);

  const handleClick = (type, indexes, item) => {
    setSelectedPath({ type, indexes });
    onSelectItem({ type, item, indexes });
  };

  const closeModal = () => setModal(null);

  const handleDelete = async () => {
    const { type, indexes } = modal;
    let url = '';

    if (type === 'term') {
      url = `/api/lessons/${courseId}/term/${indexes.termIndex}`;
    } else if (type === 'topic') {
      url = `/api/lessons/${courseId}/term/${indexes.termIndex}/topic/${indexes.topicIndex}`;
    } else if (type === 'lesson') {
      url = `/api/lessons/${courseId}/term/${indexes.termIndex}/topic/${indexes.topicIndex}/lesson/${indexes.lessonIndex}`;
    } else if (type === 'chapter') {
      url = `/api/lessons/${courseId}/term/${indexes.termIndex}/topic/${indexes.topicIndex}/lesson/${indexes.lessonIndex}/chapter/${indexes.chapterIndex}`;
    }

    await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    closeModal();
    refresh();
  };

  return (
    <div className="space-y-4 text-sm">
      {/* ➕ Add Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={onAddTerm}
          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
        >
          Add Term
        </button>

        <button
          disabled={selectedPath?.type !== 'term'}
          onClick={() => {
            const { termIndex } = selectedPath?.indexes || {};
            onAddTopic(termIndex);
          }}
          className={`px-3 py-1 rounded ${
            selectedPath?.type === 'term'
              ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Add Topic
        </button>

        <button
          disabled={selectedPath?.type !== 'topic'}
          onClick={() => {
            const { termIndex, topicIndex } = selectedPath?.indexes || {};
            onAddLesson(termIndex, topicIndex);
          }}
          className={`px-3 py-1 rounded ${
            selectedPath?.type === 'topic'
              ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Add Lesson
        </button>

        <button
          disabled={selectedPath?.type !== 'lesson'}
          onClick={() => {
            const { termIndex, topicIndex, lessonIndex } = selectedPath?.indexes || {};
            onAddChapter(termIndex, topicIndex, lessonIndex);
          }}
          className={`px-3 py-1 rounded ${
            selectedPath?.type === 'lesson'
              ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Add Chapter
        </button>
      </div>

      {/* 🧭 Tree Navigation */}
      {data.map((term, termIndex) => (
        <div key={termIndex} className="border-l-2 pl-2 space-y-1">
          <div
            className={`cursor-pointer ${
              isSelected('term', { termIndex })
                ? 'text-indigo-600 font-semibold'
                : 'text-gray-800'
            }`}
            onClick={() => handleClick('term', { termIndex }, term)}
          >
            {term.title || `Term ${term.term}`}
          </div>

          {term.topics?.map((topic, topicIndex) => (
            <div key={topicIndex} className="ml-4 border-l-2 pl-2 space-y-1">
              <div
                className={`cursor-pointer ${
                  isSelected('topic', { termIndex, topicIndex })
                    ? 'text-indigo-600 font-semibold'
                    : 'text-gray-700'
                }`}
                onClick={() => handleClick('topic', { termIndex, topicIndex }, topic)}
              >
                {topic.title}
              </div>

              {topic.lessons?.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="ml-4 border-l-2 pl-2 space-y-1">
                  <div
                    className={`cursor-pointer ${
                      isSelected('lesson', { termIndex, topicIndex, lessonIndex })
                        ? 'text-indigo-600 font-semibold'
                        : 'text-gray-600'
                    }`}
                    onClick={() =>
                      handleClick('lesson', { termIndex, topicIndex, lessonIndex }, lesson)
                    }
                  >
                    {lesson.title}
                  </div>

                  {lesson.chapters?.map((chapter, chapterIndex) => (
                    <div
                      key={chapterIndex}
                      onClick={() =>
                        handleClick(
                          'chapter',
                          { termIndex, topicIndex, lessonIndex, chapterIndex },
                          chapter
                        )
                      }
                      className={`ml-4 pl-2 border-l-2 cursor-pointer ${
                        isSelected('chapter', {
                          termIndex,
                          topicIndex,
                          lessonIndex,
                          chapterIndex,
                        })
                          ? 'text-indigo-600 font-semibold'
                          : 'text-gray-500'
                      } hover:text-indigo-500`}
                    >
                      {chapter.title}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* 🗑️ Delete Confirmation */}
      {modal?.mode === 'delete' ? (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded max-w-md w-full space-y-4">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete this {modal.type}? This will also remove all nested items underneath it.
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeModal}
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
      ) : null}
    </div>
  );
};

export default SidebarTree;