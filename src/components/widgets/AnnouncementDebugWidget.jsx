// ==============================
// 📄 AnnouncementDebugWidget.jsx
// ==============================
// Static import version with full debug logs.
// ==============================

import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

console.log('🧪 AnnouncementDebugWidget version: v1.0.4');
console.log('📦 AnnouncementDebugWidget file loaded');

export default function AnnouncementDebugWidget({ role }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  console.log('✅ AnnouncementDebugWidget mounted');
  console.log('🧪 role prop received:', role);

  useEffect(() => {
    console.log('🧪 useEffect triggered inside AnnouncementDebugWidget');
    console.log('🚀 axiosInstance loaded, making request...');

    axiosInstance.get('/announcements')
      .then((res) => {
        console.log('📣 Fetched announcements:', res.data);
        setAnnouncements(res.data);
        setLoading(false);
      })
      .catch((err) => {
        const message = err.response?.data?.message || err.message;
        console.error('❌ Error fetching announcements:', message);
        setError(message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <h2 className="text-lg font-semibold text-gray-800">📣 Announcements</h2>

      {loading && <p className="text-gray-500">⏳ Loading announcements...</p>}
      {error && <p className="text-red-600">❌ {error}</p>}
      {!loading && !error && announcements.length === 0 && (
        <p className="text-gray-600">📭 No announcements available.</p>
      )}

      {!loading && !error && announcements.length > 0 && (
        <ul className="space-y-2">
          {announcements.map((a) => (
            <li key={a.id} className="border rounded p-2">
              <p className="font-semibold text-gray-800">{a.title}</p>
              <p className="text-sm text-gray-600">{a.message}</p>
              <p className="text-xs text-gray-400">
                Posted: {new Date(a.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}