// ==============================
// 📄 DashboardTab.jsx
// ==============================
// Faculty dashboard overview with insights, actions, and announcements.
// ==============================

import { useEffect } from 'react';
import Overview from '../Overview';

import {
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

import ActionCard from '../../../components/actions/ActionCard';
import InsightCard from '../../../components/cards/InsightCard';
import TrendCard from '../../../components/cards/TrendCard';
import AnnouncementDebugWidget from '../../../components/widgets/AnnouncementDebugWidget';

export default function DashboardTab() {
  const role = localStorage.getItem('userRole') || '';
  console.log('🧪 role from localStorage:', role || '[empty or undefined]');

  useEffect(() => {
    console.log('✅ DashboardTab mounted');
  }, []);

  return (
    <div className="space-y-10">
      <Overview>
        {/* 🧠 Learner Insights Summary */}
        <section className="mt-8">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Learner Insights</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>📈 82% of learners completed their homework this week</li>
            <li>🕒 Average learner study time: 6.2 hrs this week</li>
            <li>📝 68 of 100 assignments graded</li>
          </ul>
        </section>

        {/* ⚡ Quick Actions */}
        <section className="mt-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <ActionCard label="Post Announcement" icon="📢" />
            <ActionCard label="Grade Assignments" icon="📝" />
            <ActionCard label="View Class Performance" icon="📊" />
            <ActionCard label="Manage Class Groups" icon="👥" />
          </div>
        </section>

        {/* 📣 Announcements Section */}
        <section className="mt-10">
          {console.log('🧪 AnnouncementDebugWidget JSX rendered')}
          <AnnouncementDebugWidget role={role} />
          <p className="text-green-600 font-bold">✅ AnnouncementDebugWidget is mounted</p>
        </section>
      </Overview>

      {/* 📊 Learner Insights Graph Block */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Learner Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
          <InsightCard
            title="Study Time (This Week)"
            value="6.2 hrs avg"
            icon={<ClockIcon className="w-5 h-5 text-indigo-500" />}
            color="bg-indigo-100"
          />
          <InsightCard
            title="Homework Completion"
            value="82%"
            icon={<CheckCircleIcon className="w-5 h-5 text-green-500" />}
            color="bg-green-100"
          />
          <InsightCard
            title="Assignments Graded"
            value="68 / 100"
            icon={<ChartBarIcon className="w-5 h-5 text-purple-500" />}
            color="bg-purple-100"
          />
        </div>
      </section>

      {/* 📈 Performance Trends */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <TrendCard title="Teaching Hours" value="↑ 12% this week" />
          <TrendCard title="Learner Rating" value="↔ 4.6 / 5" />
          <TrendCard title="Assignments Graded" value="↓ 8% this week" />
        </div>
      </section>
    </div>
  );
}