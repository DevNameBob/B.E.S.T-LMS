const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// 📌 Register a User
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'User already exists' });

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// 📌 Login a User (with detailed debugging)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('🔐 Login attempt:', { email, password });

    if (!email || !password) {
      console.log('⚠️ Missing email or password');
      return res.status(400).json({ error: 'Missing login credentials' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log(`❌ User not found: ${email}`);
      return res.status(401).json({ error: 'User not found' });
    }

    console.log('🔒 Stored password hash:', user.password);

    const match = await bcrypt.compare(password, user.password);
    console.log(`🔎 Password match result: ${match}`);

    if (!match) {
      console.log('❌ Incorrect password');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log(`✅ Login successful for: ${user.email}`);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('🔥 Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// 📌 Get current logged-in user details
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('⚠️ Fetch current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;