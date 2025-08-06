import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import styles from './CreateRoomForm.module.css';

export default function CreateRoomForm({ user, onCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [access, setAccess] = useState(['shared']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!user || !user._id) {
      console.error('❌ User not found. Cannot create room.');
      setError('User not authenticated. Please log in.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post('/chat/rooms', {
        name,
        description,
        access,
        createdBy: user._id,
      });

      onCreated?.(res.data);
      setName('');
      setDescription('');
      setAccess(['shared']);
    } catch (err) {
      console.error('❌ Failed to create room:', err);
      setError('Failed to create room. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Create New Group</h3>

      {error && <p className={styles.error}>{error}</p>}

      <input
        type="text"
        placeholder="Room name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={isLoading}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        disabled={isLoading}
      />

      <label>
        Access:
        <select
          value={access[0]}
          onChange={(e) => setAccess([e.target.value])}
          disabled={isLoading}
        >
          <option value="shared">Shared</option>
          <option value="faculty">Faculty Only</option>
          <option value="learner">Learner Only</option>
        </select>
      </label>

      <button type="submit" disabled={isLoading}>
        {isLoading ? (
          <span className={styles.spinner} aria-label="Loading" />
        ) : (
          'Create'
        )}
      </button>
    </form>
  );
}