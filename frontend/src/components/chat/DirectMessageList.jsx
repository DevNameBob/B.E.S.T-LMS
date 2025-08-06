import styles from './ChatRoomList.module.css'; // ✅ Reuse room styles

const mockDMs = [
  {
    id: 'dm1',
    name: 'Thabo M.',
    avatar: '/avatars/thabo.png',
    lastMessage: 'See you at 10am!',
    timestamp: '08:45',
  },
  {
    id: 'dm2',
    name: 'Zanele K.',
    avatar: '/avatars/zanele.png',
    lastMessage: 'Got the notes, thanks 🙌',
    timestamp: 'Yesterday',
  },
  {
    id: 'dm3',
    name: 'Mr. Dlamini',
    avatar: '/avatars/dlamini.png',
    lastMessage: 'Assignment feedback uploaded.',
    timestamp: 'Mon',
  },
];

export default function DirectMessageList({ onSelect }) {
  return (
    <div className={styles.container}>
      <ul className={styles.roomList}>
        {mockDMs.map(dm => (
          <li
            key={dm.id}
            className={styles.roomItem}
            onClick={() => onSelect(dm.id)}
          >
            <img src={dm.avatar} alt={dm.name} className={styles.avatar} />
            <div className={styles.roomContent}>
              <div className={styles.roomName}>{dm.name}</div>
              <div className={styles.roomDescription}>{dm.lastMessage}</div>
            </div>
            <div className={styles.timestamp}>{dm.timestamp}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}