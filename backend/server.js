const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/techhansa-infra';

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Techhansa Infra API is running');
});
const inquiryRoutes = require('./routes/inquiryRoutes');
const projectRoutes = require('./routes/projectRoutes');

app.use('/api/inquiries', inquiryRoutes);
app.use('/api/projects', projectRoutes);

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
