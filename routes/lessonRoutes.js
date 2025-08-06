const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const { authMiddleware, requireRole } = require('../middleware/auth');
const { FACULTY_ROLES } = require('../config/roles');

// 🔹 Create a Lesson
router.post('/create', authMiddleware, requireRole(FACULTY_ROLES), async (req, res) => {
  try {
    const { title, description, subject, grade, schedule, xpReward = 10 } = req.body;
    console.log('🔥 /api/lessons/create route hit');
    const user = await User.findById(req.user._id);
    if (!user || !user.schoolId) {
      return res.status(400).json({ error: 'Missing schoolId for user' });
    }

    const newLesson = new Course({
      title,
      description,
      subject,
      grade,
      schedule,
      xpReward,
      createdBy: user._id,
      schoolId: user.schoolId,
    });

    await newLesson.save();
    res.status(201).json({ message: 'Lesson created successfully', lesson: newLesson });
  } catch (error) {
    console.error('❌ Failed to create lesson:', error);
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Add Term
router.post('/:courseId/term', authMiddleware, requireRole(FACULTY_ROLES), async (req, res) => {
  try {
    const { title, summary, assessment } = req.body;
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const newTerm = {
      title,
      summary,
      assessment,
      topics: [],
    };

    course.terms.push(newTerm);
    await course.save();

    res.status(201).json({ message: 'Term created successfully', course });
  } catch (err) {
    console.error('❌ Failed to create term:', err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Add Topic
router.post('/:courseId/term/:termIndex/topic', authMiddleware, requireRole(FACULTY_ROLES), async (req, res) => {
  try {
    const { title, summary, assessment } = req.body;
    const course = await Course.findById(req.params.courseId);
    const term = course?.terms?.[req.params.termIndex];
    if (!term) return res.status(404).json({ error: 'Term not found' });

    const newTopic = {
      title,
      summary,
      assessment,
      lessons: [],
    };

    term.topics.push(newTopic);
    await course.save();

    res.status(201).json({ message: 'Topic created successfully', course });
  } catch (err) {
    console.error('❌ Failed to create topic:', err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Add Lesson
router.post('/:courseId/term/:termIndex/topic/:topicIndex/lesson', authMiddleware, requireRole(FACULTY_ROLES), async (req, res) => {
  try {
    const { title, summary, assessment } = req.body;
    const course = await Course.findById(req.params.courseId);
    const topic = course?.terms?.[req.params.termIndex]?.topics?.[req.params.topicIndex];
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    const newLesson = {
      title,
      summary,
      assessment,
      chapters: [],
    };

    topic.lessons.push(newLesson);
    await course.save();

    res.status(201).json({ message: 'Lesson created successfully', course });
  } catch (err) {
    console.error('❌ Failed to create lesson:', err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Add Chapter
router.post('/:courseId/term/:termIndex/topic/:topicIndex/lesson/:lessonIndex/chapter', authMiddleware, requireRole(FACULTY_ROLES), async (req, res) => {
  try {
    const { title, content, xp, summary, assessment } = req.body;
    const course = await Course.findById(req.params.courseId);
    const lesson = course.terms[req.params.termIndex]?.topics[req.params.topicIndex]?.lessons[req.params.lessonIndex];
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

    lesson.chapters.push({ title, content, xp, summary, assessment });
    await course.save();
    res.status(201).json({ message: 'Chapter added successfully', course });
  } catch (err) {
    console.error('❌ Failed to add chapter:', err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Update Term
router.patch('/:courseId/term/:termIndex', authMiddleware, requireRole(FACULTY_ROLES), async (req, res) => {
  try {
    const { title, term: termNumber, summary, assessment } = req.body;
    const course = await Course.findById(req.params.courseId);
    const term = course?.terms?.[req.params.termIndex];
    if (!term) return res.status(404).json({ error: 'Term not found' });

    if (title !== undefined) term.title = title;
    if (termNumber !== undefined) term.term = termNumber;
    if (summary !== undefined) term.summary = summary;
    if (assessment !== undefined) term.assessment = assessment;

    await course.save();
    res.json({ message: 'Term updated successfully', course });
  } catch (err) {
    console.error('❌ Failed to update term:', err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Update Topic
router.patch('/:courseId/term/:termIndex/topic/:topicIndex', authMiddleware, requireRole(FACULTY_ROLES), async (req, res) => {
  try {
    const { title, summary, assessment } = req.body;
    const course = await Course.findById(req.params.courseId);
    const topic = course?.terms?.[req.params.termIndex]?.topics?.[req.params.topicIndex];
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    if (title !== undefined) topic.title = title;
    if (summary !== undefined) topic.summary = summary;
    if (assessment !== undefined) topic.assessment = assessment;

    await course.save();
    res.json({ message: 'Topic updated successfully', course });
  } catch (err) {
    console.error('❌ Failed to update topic:', err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Update Lesson
router.patch('/:courseId/term/:termIndex/topic/:topicIndex/lesson/:lessonIndex', authMiddleware, requireRole(FACULTY_ROLES), async (req, res) => {
  try {
    const { title, summary, assessment } = req.body;
    const course = await Course.findById(req.params.courseId);
    const lesson = course?.terms?.[req.params.termIndex]?.topics?.[req.params.topicIndex]?.lessons?.[req.params.lessonIndex];
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

    if (title !== undefined) lesson.title = title;
    if (summary !== undefined) lesson.summary = summary;
    if (assessment !== undefined) lesson.assessment = assessment;

    await course.save();
    res.json({ message: 'Lesson updated successfully', course });
  } catch (err) {
    console.error('❌ Failed to update lesson:', err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Update Chapter
router.patch('/:courseId/term/:termIndex/topic/:topicIndex/lesson/:lessonIndex/chapter/:chapterIndex', authMiddleware, requireRole(FACULTY_ROLES), async (req, res) => {
  try {
    const { title, content, summary, xp, assessment } = req.body;
    const course = await Course.findById(req.params.courseId);
    const chapter = course?.terms?.[req.params.termIndex]?.topics?.[req.params.topicIndex]?.lessons?.[req.params.lessonIndex]?.chapters?.[req.params.chapterIndex];

    if (!chapter) return res.status(404).json({ error: 'Chapter not found' });

    if (title !== undefined) chapter.title = title;
    if (content !== undefined) chapter.content = content;
    if (summary !== undefined) chapter.summary = summary;
    if (xp !== undefined) chapter.xp = xp;
    if (assessment !== undefined) chapter.assessment = assessment;

    await course.save();
    res.json({ message: 'Chapter updated successfully', chapter });
  } catch (err) {
    console.error('❌ Failed to update chapter:', err);
    res.status(500).json({ error: err.message });
  }
});

// 🔻 Delete Term
router.delete('/:courseId/term/:termIndex', authMiddleware, requireRole(FACULTY_ROLES), async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    course.terms.splice(req.params.termIndex, 1);
    await course.save();

    res.json({ message: 'Term deleted successfully', course });
  } catch (err) {
    console.error('❌ Failed to delete term:', err);
    res.status(500).json({ error: err.message });
  }
});

// 🔻 Delete Topic
router.delete('/:courseId/term/:termIndex/topic/:topicIndex', authMiddleware, requireRole(FACULTY_ROLES), async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    const term = course?.terms?.[req.params.termIndex];
    if (!term) return res.status(404).json({ error: 'Term not found' });

    term.topics.splice(req.params.topicIndex, 1);
    await course.save();

    res.json({ message: 'Topic deleted successfully', course });
  } catch (err) {
    console.error('❌ Failed to delete topic:', err);
    res.status(500).json({ error: err.message });
  }
});

// 🔻 Delete Lesson
router.delete('/:courseId/term/:termIndex/topic/:topicIndex/lesson/:lessonIndex', authMiddleware, requireRole(FACULTY_ROLES), async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    const topic = course?.terms?.[req.params.termIndex]?.topics?.[req.params.topicIndex];
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    topic.lessons.splice(req.params.lessonIndex, 1);
    await course.save();

    res.json({ message: 'Lesson deleted successfully', course });
  } catch (err) {
    console.error('❌ Failed to delete lesson:', err);
    res.status(500).json({ error: err.message });
  }
});

// 🔻 Delete Chapter
router.delete('/:courseId/term/:termIndex/topic/:topicIndex/lesson/:lessonIndex/chapter/:chapterIndex', authMiddleware, requireRole(FACULTY_ROLES), async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    const lesson = course?.terms?.[req.params.termIndex]?.topics?.[req.params.topicIndex]?.lessons?.[req.params.lessonIndex];
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

    lesson.chapters.splice(req.params.chapterIndex, 1);
    await course.save();

    res.json({ message: 'Chapter deleted successfully', course });
  } catch (err) {
    console.error('❌ Failed to delete chapter:', err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Enroll Learner
router.post('/enroll/:lessonId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const lesson = await Course.findById(req.params.lessonId);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    if (lesson.learners.includes(user._id)) {
      return res.status(400).json({ message: 'Already enrolled in this lesson' });
    }

    lesson.learners.push(user._id);
    await lesson.save();

    user.xp += lesson.xpReward || 10;
    await user.save();

    res.json({ message: 'Enrolled successfully', lesson, xp: user.xp });
  } catch (error) {
    console.error('❌ Enrollment failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Get Lessons Created by Faculty or Belonging to Their School
router.get('/faculty', authMiddleware, requireRole(FACULTY_ROLES), async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized: No user found in request' });
    }

    const query = {
      $or: [
        { createdBy: req.user._id },
        { schoolId: req.user.schoolId }
      ]
    };

    const lessons = await Course.find(query).populate('learners', 'name email');

    res.json(lessons);
  } catch (error) {
    console.error('❌ Failed to fetch lessons:', error);
    res.status(500).json({ error: 'Server error while fetching lessons' });
  }
});

// 🔹 Get Lessons Enrolled by Learner
router.get('/learner', authMiddleware, async (req, res) => {
  try {
    const lessons = await Course.find({ learners: req.user._id });
    res.json(lessons);
  } catch (error) {
    console.error('❌ Failed to fetch learner lessons:', error);
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Get Full Lesson Structure
router.get('/:id/structure', authMiddleware, async (req, res) => {
  try {
    const lesson = await Course.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('learners', 'name email');

    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(lesson);
  } catch (error) {
    console.error('❌ Failed to fetch lesson structure:', error);
    res.status(500).json({ error: 'Failed to fetch lesson structure' });
  }
});

module.exports = router;