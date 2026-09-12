const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Announcement = require('../models/Announcement');

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

// GET all announcements (optional ?active=true filter)
router.get('/', async (req, res) => {
  try {
    const { active } = req.query;
    const filter = active === 'true' ? { isActive: true } : {};
    const announcements = await Announcement.find(filter).sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new announcement
router.post('/', adminAuth, async (req, res) => {
  try {
    const { text, isActive, isBold, textColor, bgColor } = req.body;
    const announcement = new Announcement({ text, isActive, isBold, textColor, bgColor });
    await announcement.save();
    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update announcement by ID
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { text, isActive, isBold, textColor, bgColor } = req.body;
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { text, isActive, isBold, textColor, bgColor },
      { new: true }
    );
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE announcement by ID
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.json({ message: 'Announcement deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
