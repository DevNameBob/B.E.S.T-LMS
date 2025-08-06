const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');
const ChatRoom = require('../models/ChatRoom'); // ✅ Add this
const { authMiddleware } = require('../middleware/auth');

// GET all chat rooms
router.get('/rooms', authMiddleware, async (req, res) => {
  try {
    const rooms = await ChatRoom.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (err) {
    console.error('Error fetching rooms:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET messages by room
router.get('/messages', authMiddleware, async (req, res) => {
  try {
    const { room } = req.query;
    const messages = await ChatMessage.find({ room }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new message
router.post('/messages', authMiddleware, async (req, res) => {
  try {
    const { senderId, senderName, role, room, message } = req.body;
    if (!message || !room) return res.status(400).json({ message: 'Missing fields' });

    const newMessage = new ChatMessage({ senderId, senderName, role, room, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create new room
router.post('/rooms', authMiddleware, async (req, res) => {
  try {
    const { name, description, access = ['shared'], createdBy } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const newRoom = new ChatRoom({
      name,
      description,
      access,
      createdBy,
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    console.error('Error creating room:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;