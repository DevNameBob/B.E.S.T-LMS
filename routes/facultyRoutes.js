const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware, requireRole } = require('../middleware/auth');

// 🔹 GET: List all faculty for the current school
router.get('/', authMiddleware, requireRole(['admin']), async (req, res) => {
  try {
    const faculty = await User.find({
      role: { $in: ['contentHead', 'onboarder', 'announcer', 'educator'] },
      schoolId: req.user.schoolId,
    }).sort({ createdAt: -1 });

    res.json(faculty);
  } catch (err) {
    console.error('❌ Failed to fetch faculty:', err);
    res.status(500).json({ error: 'Failed to fetch faculty' });
  }
});

// 🔹 POST: Create a new faculty member (uses schema-based hashing)
router.post('/', authMiddleware, requireRole(['admin']), async (req, res) => {
  try {
    const { name, email, password, role, phone, subject, bio } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Name, email, password, and role are required.' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already in use.' });

    const newFaculty = new User({
      name,
      email,
      password, // 👈 Pass plain password — schema will hash
      role,
      accessLevel: determineAccessLevel(role),
      schoolId: req.user.schoolId,
      phone,
      subject,
      bio,
      status: 'Active',
    });

    await newFaculty.save(); // 🔐 Triggers schema hook
    res.status(201).json(newFaculty);
  } catch (err) {
    console.error('❌ Failed to create faculty:', err);
    res.status(400).json({
      error: err.message || 'Failed to create faculty',
      details: err.errors || null
    });
  }
});

// 🔹 DELETE: Remove faculty by ID
router.delete('/:id', authMiddleware, requireRole(['admin']), async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({
      _id: req.params.id,
      schoolId: req.user.schoolId,
    });

    if (!deleted) return res.status(404).json({ error: 'Faculty not found.' });

    res.json({ message: 'Faculty deleted successfully.' });
  } catch (err) {
    console.error('❌ Failed to delete faculty:', err);
    res.status(500).json({ error: 'Failed to delete faculty.' });
  }
});

// 🔹 PUT: Update faculty details
router.put('/:id', authMiddleware, requireRole(['admin']), async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { _id: req.params.id, schoolId: req.user.schoolId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Faculty not found.' });

    res.json(updated);
  } catch (err) {
    console.error('❌ Failed to update faculty:', err);
    res.status(500).json({ error: 'Failed to update faculty.' });
  }
});

// 🔧 Optional: Dynamic accessLevel assignment
function determineAccessLevel(role) {
  const levels = {
    admin: 5,
    contentHead: 4,
    onboarder: 3,
    announcer: 2,
    educator: 1,
    learner: 0
  };
  return levels[role] || 0;
}

module.exports = router;