// 📄 learnerRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { authMiddleware, requireRole } = require('../middleware/auth');

// GET all learners — Admin + Faculty
router.get('/', authMiddleware, requireRole(['admin', 'faculty']), async (req, res) => {
  try {
    const learners = await User.find({
      role: 'learner',
      schoolId: req.user.schoolId,
    }).sort({ createdAt: -1 });

    res.json(learners);
  } catch (err) {
    console.error('❌ Failed to fetch learners:', err);
    res.status(500).json({ error: 'Failed to fetch learners' });
  }
});

// POST new learner — Admin + Faculty
router.post('/', authMiddleware, requireRole(['admin', 'faculty']), async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      grade,
      classGroup,
      status,
      parentName,
      relationship,
      parentContact,
      parentEmail,
      address,
      allergies,
      medicalConditions,
      emergencyContactName,
      emergencyContactNumber,
      medicalAid,
    } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const newLearner = new User({
      name,
      email,
      password,
      role: 'learner',
      grade,
      classGroup,
      status,
      parentName,
      relationship,
      parentContact,
      parentEmail,
      address,
      allergies,
      medicalConditions,
      emergencyContactName,
      emergencyContactNumber,
      medicalAid,
      schoolId: req.user.schoolId,
    });

    await newLearner.save();
    res.status(201).json(newLearner);
  } catch (err) {
    console.error('❌ Failed to enrol learner:', err);
    res.status(400).json({ error: 'Failed to enrol learner' });
  }
});

// PUT — Update learner — Admin + Faculty
router.put('/:id', authMiddleware, requireRole(['admin', 'faculty']), async (req, res) => {
  try {
    // 🔒 Hash password if it's being changed
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updated = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'learner', schoolId: req.user.schoolId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Learner not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('❌ Failed to update learner:', err);
    res.status(500).json({ error: 'Failed to update learner' });
  }
});

// DELETE — Remove learner — Admin + Faculty
router.delete('/:id', authMiddleware, requireRole(['admin', 'faculty']), async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({
      _id: req.params.id,
      role: 'learner',
      schoolId: req.user.schoolId,
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Learner not found' });
    }

    res.json({ message: 'Learner deleted successfully' });
  } catch (err) {
    console.error('❌ Failed to delete learner:', err);
    res.status(500).json({ error: 'Failed to delete learner' });
  }
});

module.exports = router;