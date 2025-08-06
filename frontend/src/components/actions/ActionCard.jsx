export default function ActionCard({ label, icon }) {
  return (
    <button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium p-4 rounded-lg flex items-center justify-center gap-2 transition shadow-sm">
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}