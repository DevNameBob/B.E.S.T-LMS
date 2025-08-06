// 📄 lessonController.js

exports.createLesson = async (req, res) => {
  try {
    const { title, description, resources } = req.body;

    // Replace with your actual Lesson model and logic
    const newLesson = new Lesson({
      title,
      description,
      resources,
      createdBy: req.user._id,
      schoolId: req.user.schoolId,
    });

    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (err) {
    console.error('❌ Lesson creation failed:', err);
    res.status(500).json({ error: 'Failed to create lesson' });
  }
};