const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  access: [String], // ['faculty', 'learner', 'shared']
  createdBy: String,
}, { timestamps: true });

module.exports = mongoose.model('ChatRoom', chatRoomSchema);