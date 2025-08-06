import { useNavigate } from 'react-router-dom';
import useAutoTab from '../hooks/useAutoTab';
import GradientBlock from './GradientBlock'; // ✅ Import reusable wrapper

export default function WelcomePanel() {
  const navigate = useNavigate();
  const tabs = ['School Updates', 'Dev Updates', 'Timetable'];
  const [activeTab, setActiveTab] = useAutoTab(tabs.length);

  const announcements = {
    'School Updates': ['📢 Midterm exams start next week.', '📢 School trip forms due Friday.'],
    'Dev Updates': ['🛠️ Dark mode launching soon!', '🛠️ New badge system in testing.'],
    'Timetable': [
      '🕒 08:00 - Math (Room 201)',
      '🕒 10:00 - History (Room 105)',
      '🕒 13:00 - Computer Science (Lab 3)',
    ],
  };

  const handleClick = () => {
    if (tabs[activeTab] === 'Timetable') {
      navigate('/timetable');
    } else {
      navigate('/notifications');
    }
  };

  return (
    <GradientBlock>
      {/* Welcome message */}
      <div className="text-center text-white mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome Back, Bongani</h1>
        <p className="mt-2 text-white/90">
          Here’s what’s happening in your learning journey today:
        </p>
      </div>

      {/* Frosted-glass announcement box */}
      <div className="backdrop-blur-md bg-white/30 rounded-lg p-4 max-h-64 overflow-y-auto shadow-inner flex flex-col justify-between">
        {/* Active tab content */}
        <div className="space-y-3">
          {announcements[tabs[activeTab]].map((item, index) => (
            <div
              key={index}
              onClick={handleClick}
              className="bg-white/60 p-3 rounded cursor-pointer hover:bg-white/80 transition"
            >
              <p className="text-sm text-gray-800">{item}</p>
            </div>
          ))}
        </div>

        {/* Tab navigation buttons */}
        <div className="flex justify-center mt-4 space-x-4">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`text-xs font-medium px-3 py-1 rounded-full transition ${
                index === activeTab
                  ? 'bg-white/80 text-gray-800'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </GradientBlock>
  );
}