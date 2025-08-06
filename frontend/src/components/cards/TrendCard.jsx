export default function TrendCard({ title, value }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
      <div className="font-semibold text-gray-800 mb-1">{title}</div>
      <div className="text-indigo-600 font-bold">{value}</div>
    </div>
  );
}