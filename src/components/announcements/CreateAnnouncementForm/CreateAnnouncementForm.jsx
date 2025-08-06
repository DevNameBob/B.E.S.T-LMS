import { useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import styles from './CreateAnnouncementForm.module.css';

export default function CreateAnnouncementForm({ user, onCreated }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('all');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ success: '', error: '' });

  const canPost = ['admin', 'faculty'].includes(user.role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ success: '', error: '' });

    const payload = {
      title,
      body,
      audience,
      authorId: user._id,
    };

    try {
      const res = await axiosInstance.post('/announcements', payload);
      const newAnnouncement = res.data;

      if (onCreated && newAnnouncement?.title) {
        onCreated(newAnnouncement);
      }

      setTitle('');
      setBody('');
      setAudience('all');
      setFeedback({ success: '✅ Announcement posted!', error: '' });
    } catch (err) {
      console.error('Failed to create announcement:', err);
      setFeedback({
        error: err.response?.data?.message || '❌ Failed to post announcement',
        success: '',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!canPost) return null;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.heading}>📢 Create Announcement</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className={styles.input}
      />

      <textarea
        placeholder="Write your announcement..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        className={styles.textarea}
      />

      <select
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        className={styles.select}
      >
        <option value="all">All</option>
        <option value="faculty">Faculty</option>
        <option value="learners">Learners</option>
      </select>

      <button type="submit" disabled={submitting} className={styles.button}>
        {submitting ? 'Posting...' : 'Post Announcement'}
      </button>

      {feedback.error && <p className={styles.error}>{feedback.error}</p>}
      {feedback.success && <p className={styles.success}>{feedback.success}</p>}
    </form>
  );
}