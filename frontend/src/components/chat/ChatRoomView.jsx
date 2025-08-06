import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import styles from './ChatRoomView.module.css';

export default function ChatRoomView({ room, user, onBack }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axiosInstance.get(`/chat/rooms/${room._id}/messages`);
      setMessages(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;
    try {
      const res = await axiosInstance.post(`/chat/rooms/${room._id}/messages`, {
        senderId: user._id,
        senderName: user.name,
        text,
      });
      setMessages((prev) => [...prev, res.data]);
      setText('');
    } catch (err) {
      console.error('❌ Failed to send message:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [room._id]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backButton}>← Back</button>
        <h3>{room.name}</h3>
      </div>

      <div className={styles.messages}>
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className={`${styles.message} ${msg.senderId === user._id ? styles.self : styles.other}`}>
              <div className={styles.sender}>{msg.senderName}</div>
              <div className={styles.text}>{msg.text}</div>
            </div>
          ))
        )}
      </div>

      <div className={styles.inputBar}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
}