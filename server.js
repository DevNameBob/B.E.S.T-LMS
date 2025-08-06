const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // ✅ exact frontend origin
  credentials: true,               // ✅ allow cookies/auth headers
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const learnerRoutes = require('./routes/learnerRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const chatRoutes = require('./routes/chatRoutes'); // ✅ NEW

app.use('/api/auth', authRoutes);
app.use('/api/learners', learnerRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/chat', chatRoutes); // ✅ NEW

// Authenticated user info
const { authMiddleware } = require('./middleware/auth');
const User = require('./models/User');

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));