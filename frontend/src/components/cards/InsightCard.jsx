export default function InsightCard({ title, value, icon, color }) {
  return (
    <div className={`rounded-lg p-4 shadow-sm flex items-center gap-4 ${color}`}>
      <div className="p-2 bg-white rounded-full shadow">{icon}</div>
      <div>
        <div className="text-sm font-semibold text-gray-800">{title}</div>
        <div className="text-base font-bold">{value}</div>
      </div>
    </div>
  );
}