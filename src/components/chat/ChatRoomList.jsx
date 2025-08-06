import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import styles from './ChatRoomList.module.css';
import CreateRoomForm from './CreateRoomForm';
import { useAuth } from '../../context/AuthContext';

export default function ChatRoomList({ onSelect }) {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchRooms = async () => {
    try {
      const res = await axiosInstance.get('/chat/rooms');
      setRooms(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch chat rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreatedRoom = (newRoom) => {
    setRooms((prev) => [...prev, newRoom]);
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* 🔻 Removed title */}
        <button className={styles.createButton} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '➕ Create Group'}
        </button>
      </div>

      {showForm && user && (
        <CreateRoomForm user={user} onCreated={handleCreatedRoom} />
      )}

      {loading ? (
        <p>Loading rooms...</p>
      ) : (
        <ul className={styles.roomList}>
          {rooms.map((room) => (
            <li key={room._id} className={styles.roomItem} onClick={() => onSelect(room)}>
              <div className={styles.avatar}>
                {room.name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.roomContent}>
                <div className={styles.roomName}>{room.name}</div>
                <div className={styles.roomDescription}>{room.description}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}