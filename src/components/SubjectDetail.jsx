export default function SubjectDetail({ subject, onBack }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={onBack} className="text-sm text-indigo-600 mb-4 hover:underline">
        ← Back to Subjects
      </button>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-2">{subject.name}</h2>
        <p className="text-gray-700 mb-4">{subject.description}</p>
        <p><strong>Current Topic:</strong> {subject.currentTopic}</p>
        <p><strong>Progression:</strong> {subject.butterflyStage}</p>
        <p><strong>Time Spent:</strong> {subject.timeSpent}</p>
        <p><strong>Streak:</strong> {subject.streak} days</p>
        {/* Add more detailed content here */}
      </div>
    </div>
  );
}