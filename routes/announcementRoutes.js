const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const { authMiddleware } = require('../middleware/auth');
const { FACULTY_ROLES } = require('../config/roles');

// GET announcements (filtered by role)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const role = req.user.role;

    const filter =
      FACULTY_ROLES.includes(role) ? { audience: { $in: ['all', 'faculty'] } } :
      role === 'learner' ? { audience: { $in: ['all', 'learners'] } } :
      {};

    const announcements = await Announcement.find(filter).sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    console.error('Error fetching announcements:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new announcement
router.post('/', authMiddleware, async (req, res) => {
  try {
    const role = req.user.role;

    if (!FACULTY_ROLES.includes(role)) {
      return res.status(403).json({ message: 'You do not have permission to post announcements' });
    }

    const { title, body, audience = 'all' } = req.body;

    if (!title || !body) {
      return res.status(400).json({ message: 'Title and body are required' });
    }

    const newAnnouncement = new Announcement({ title, body, audience });
    await newAnnouncement.save();

    res.status(201).json(newAnnouncement);
  } catch (err) {
    console.error('Error creating announcement:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;