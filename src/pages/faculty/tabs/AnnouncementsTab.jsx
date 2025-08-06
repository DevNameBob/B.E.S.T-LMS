import { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import CreateAnnouncementForm from '../../../components/announcements/CreateAnnouncementForm/CreateAnnouncementForm';
import AnnouncementList from '../../../components/announcements/AnnouncementList';
import ChatRoomList from '../../../components/chat/ChatRoomList';
import ChatRoomView from '../../../components/chat/ChatRoomView';
import DirectMessageList from '../../../components/chat/DirectMessageList';
import DirectMessageView from '../../../components/chat/DirectMessageView';
import TabToggle from '../../../components/TabToggle';
import styles from './AnnouncementsTab.module.css';

export default function AnnouncementsTab() {
  const user = {
    _id: '123',
    name: 'John Doe',
    role: 'faculty', // or 'learner'
  };

  const [activeTab, setActiveTab] = useState('announcements');
  const [chatMode, setChatMode] = useState('rooms'); // 'rooms' or 'friends'
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [selectedDMRoom, setSelectedDMRoom] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedChatRoom(null);
    setSelectedDMRoom(null);
  };

  const handleBack = () => {
    setSelectedChatRoom(null);
    setSelectedDMRoom(null);
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await axiosInstance.get('/announcements');
      setAnnouncements(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className={styles.container}>
      <TabToggle
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={[
          { key: 'announcements', label: 'Announcements', icon: '' },
          { key: 'chat', label: 'Chat', icon: '' },
        ]}
      />

      {activeTab === 'announcements' ? (
        <>
          <div className={styles.header}>
            <h2 className={styles.title}>📣 Announcements</h2>
            {user.role === 'faculty' && (
              <button
                onClick={() => setShowForm((prev) => !prev)}
                className={styles.button}
              >
                {showForm ? '❌ Cancel' : '➕ Create'}
              </button>
            )}
          </div>

          {showForm && (
            <div className={styles.section}>
              <CreateAnnouncementForm user={user} onCreated={fetchAnnouncements} />
            </div>
          )}

          {loading ? (
            <p>Loading announcements...</p>
          ) : (
            <AnnouncementList announcements={announcements} />
          )}
        </>
      ) : (
        <>
          {/* Chat Mode Toggle */}
          <div className={styles.subTabBar}>
            <button
              className={`${styles.subTab} ${chatMode === 'rooms' ? styles.active : ''}`}
              onClick={() => {
                setChatMode('rooms');
                setSelectedChatRoom(null);
                setSelectedDMRoom(null);
              }}
            >
              💬 Rooms
            </button>
            <button
              className={`${styles.subTab} ${chatMode === 'friends' ? styles.active : ''}`}
              onClick={() => {
                setChatMode('friends');
                setSelectedChatRoom(null);
                setSelectedDMRoom(null);
              }}
            >
              👥 Friends
            </button>
          </div>

          {/* Chat View Logic */}
          {chatMode === 'rooms' ? (
            selectedChatRoom ? (
              <ChatRoomView room={selectedChatRoom} user={user} onBack={handleBack} />
            ) : (
              <ChatRoomList onSelect={setSelectedChatRoom} />
            )
          ) : selectedDMRoom ? (
            <>
              <div className={styles.chatHeader}>
                <button onClick={handleBack} className={styles.backButton}>← Back</button>
                <h3 className={styles.chatTitle}>Direct Message</h3>
              </div>
              <DirectMessageView roomId={selectedDMRoom} currentUserId={user._id} />
            </>
          ) : (
            <DirectMessageList onSelect={setSelectedDMRoom} />
          )}
        </>
      )}
    </div>
  );
}