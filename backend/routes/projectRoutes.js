const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');

// JWT admin auth middleware
const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_change_in_production');
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

router.get('/', getProjects);
router.get('/:id', getProjectById);

// Protected admin routes
router.post('/', adminAuth, createProject);
router.put('/:id', adminAuth, updateProject);
router.delete('/:id', adminAuth, deleteProject);

module.exports = router;
