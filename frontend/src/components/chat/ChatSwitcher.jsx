import { useState } from 'react';
import ChatRoomList from './ChatRoomList';
import DirectMessageList from './DirectMessageList'; // You’ll create this next
import styles from './ChatSwitcher.module.css';

export default function ChatSwitcher({ onSelect }) {
  const [activeTab, setActiveTab] = useState('rooms');

  return (
    <div className={styles.container}>
      <div className={styles.tabBar}>
        <button
          className={`${styles.tab} ${activeTab === 'rooms' ? styles.active : ''}`}
          onClick={() => setActiveTab('rooms')}
        >
          💬 Rooms
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'friends' ? styles.active : ''}`}
          onClick={() => setActiveTab('friends')}
        >
          👥 Friends
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'rooms' ? (
          <ChatRoomList onSelect={onSelect} />
        ) : (
          <DirectMessageList onSelect={onSelect} />
        )}
      </div>
    </div>
  );
}