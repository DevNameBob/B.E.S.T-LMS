export default function SummaryCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
      <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">{icon}</div>
      <div>
        <div className="text-xl font-bold text-gray-800">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}