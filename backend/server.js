const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
// const MONGODB_URI = process.env.MONGODB_URI 

app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const frontendDistPath = path.resolve(__dirname, '..', 'frontend', 'dist');
const inquiryRoutes = require('./routes/inquiryRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const popupBannerRoutes = require('./routes/popupBannerRoutes');

app.use('/api/inquiries', inquiryRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/announcement', announcementRoutes);
app.use('/api/popup-banners', popupBannerRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB (Make sure your local MongoDB instance is running!)');
    console.error(err.message);
  });

// Serve static frontend build (after API routes so /api/* is not intercepted)
if (fs.existsSync(frontendDistPath) && fs.existsSync(path.join(frontendDistPath, 'index.html'))) {
  console.log('--------------------------------------');
  console.log('Serving Frontend Build from:', frontendDistPath);
  console.log('--------------------------------------');

  app.use(express.static(frontendDistPath));

  // Catch-all for React Router — skip if it's an API request
  app.get(/.*/,  (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  console.log('⚠️  Frontend build not found at:', frontendDistPath);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
