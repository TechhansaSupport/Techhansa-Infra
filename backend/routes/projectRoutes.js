const express = require('express');
const router = express.Router();
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');

// Very basic admin auth middleware for MVP
const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

router.get('/', getProjects);
router.get('/:id', getProjectById);

// Protected admin routes
router.post('/', adminAuth, createProject);
router.put('/:id', adminAuth, updateProject);
router.delete('/:id', adminAuth, deleteProject);

module.exports = router;
