const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  audience: {
    type: String,
    enum: ['all', 'faculty', 'learners'],
    default: 'all',
  },
}, { timestamps: true }); // ✅ adds createdAt and updatedAt automatically

module.exports = mongoose.model('Announcement', announcementSchema);