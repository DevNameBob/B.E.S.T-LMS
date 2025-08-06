const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 🔹 Base User Schema with Role-based Fields
const UserSchema = new mongoose.Schema({
  // 🔹 Shared Core Fields
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ['admin', 'contentHead', 'onboarder', 'announcer', 'educator', 'learner'],
    required: true
  },
  accessLevel: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Pending', 'Disabled'], default: 'Pending' },
  xp: { type: Number, default: 0 },
  grade: { type: String },
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },

  // 🔹 Learner-specific Fields
  classGroup: { type: String },
  parentName: { type: String },
  relationship: { type: String },
  parentContact: { type: String },
  parentEmail: { type: String },
  address: { type: String },
  allergies: { type: String },
  medicalConditions: { type: String },
  emergencyContactName: { type: String },
  emergencyContactNumber: { type: String },
  medicalAid: { type: String },
  lastLogin: { type: Date },

  // 🔹 Faculty-specific Fields
  department: { type: String },
  position: { type: String },
  phone: { type: String },
  subject: { type: String },
  bio: { type: String },
  rating: { type: Number, default: 4.0 },
  teachingHours: { type: Number, default: 0 }
}, { timestamps: true });

// 🔐 Pre-save Hook: Secure Password Hashing
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', UserSchema);