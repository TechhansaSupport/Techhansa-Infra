const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/techhansa-infra';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    const adminEmail = 'admin@techhansa.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('techhansa2026', salt);

    const newAdmin = new User({
      name: 'Super Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'Admin'
    });

    await newAdmin.save();
    console.log('Initial admin seeded successfully');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  });
