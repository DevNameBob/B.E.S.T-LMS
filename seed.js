const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🌱 Connected to MongoDB');

    const demoSchoolId = new mongoose.Types.ObjectId();

    const users = [
      {
        name: 'Test Admin',
        email: 'admin@test.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        accessLevel: 5,
        schoolId: demoSchoolId,
        status: 'Active'
      },
      {
        name: 'Test Faculty',
        email: 'faculty@test.com',
        password: await bcrypt.hash('faculty123', 10),
        role: 'educator', // Or 'contentHead' / 'announcer' / 'onboarder'
        accessLevel: 1,
        schoolId: demoSchoolId,
        status: 'Active'
      },
      {
        name: 'Test Learner',
        email: 'learner@test.com',
        password: await bcrypt.hash('learner123', 10),
        role: 'learner',
        grade: '10',
        schoolId: demoSchoolId,
        status: 'Active'
      },
    ];

    await User.deleteMany({ email: { $in: users.map(u => u.email) } });
    await User.insertMany(users);

    console.log('✅ Seeded test users successfully');
    console.log('👑 Admin login → admin@test.com | admin123');
    console.log('👤 Faculty login → faculty@test.com | faculty123');
    console.log('🎓 Learner login → learner@test.com | learner123');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

seedUsers();