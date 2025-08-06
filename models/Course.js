// models/Course.js
const mongoose = require('mongoose');

// 📝 Assessment Schema
const assessmentSchema = [
  {
    type: { type: String, enum: ['multipleChoice', 'written', 'scenario'], default: 'multipleChoice' },
    question: { type: String, required: true },
    options: { type: [String] },        // optional unless multipleChoice
    correctIndex: { type: Number },     // optional unless multipleChoice
    wordLimit: { type: Number },        // optional for written
    imageUrl: { type: String },         // optional for scenario/image-based
  }
];

// 🧱 Chapter Schema
const chapterSchema = new mongoose.Schema({
  title: String,
  content: String,
  xp: Number,
  summary: { type: String, default: '' },
  assessment: assessmentSchema,
});

// 📘 Lesson Schema
const lessonSchema = new mongoose.Schema({
  title: String,
  summary: { type: String, default: '' },
  assessment: assessmentSchema,
  chapters: [chapterSchema],
});

// 📂 Topic Schema
const topicSchema = new mongoose.Schema({
  title: String,
  summary: { type: String, default: '' },
  assessment: assessmentSchema,
  lessons: [lessonSchema],
});

// 📅 Term Schema
const termSchema = new mongoose.Schema({
  title: String,
  summary: { type: String, default: '' },
  assessment: assessmentSchema,
  topics: [topicSchema],
});

// 🎓 Course Schema
const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String },
    grade: { type: String },
    schedule: { type: String },
    xpReward: { type: Number, default: 50 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    learners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    terms: [termSchema],
  },
  { timestamps: true }
);

// ✅ Export using CommonJS
module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);