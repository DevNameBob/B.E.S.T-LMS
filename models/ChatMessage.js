const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  senderId: String,
  senderName: String,
  role: String,
  room: String,
  message: String,
}, { timestamps: true });

module.exports = mongoose.model('ChatMessage', chatSchema);