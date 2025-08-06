export default function ChapterContent({ chapter }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{chapter.title}</h2>
      <p className="text-gray-700">{chapter.summary || 'No summary provided.'}</p>
      <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Start Chapter
      </button>
    </div>
  );
}