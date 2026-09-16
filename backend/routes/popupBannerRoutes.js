const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const PopupBanner = require('../models/PopupBanner');

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

// GET active popup banner (Public)
router.get('/active', async (req, res) => {
  try {
    const banner = await PopupBanner.findOne({ isActive: true }).sort({ createdAt: -1 });
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all popup banners (Admin)
router.get('/', adminAuth, async (req, res) => {
  try {
    const banners = await PopupBanner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new popup banner (Admin)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, description, image, linkUrl, linkText, isActive } = req.body;
    
    // If setting this one to active, deactivate all others
    if (isActive) {
      await PopupBanner.updateMany({}, { isActive: false });
    }

    const banner = new PopupBanner({ title, description, image, linkUrl, linkText, isActive });
    await banner.save();
    res.status(201).json(banner);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT update popup banner by ID (Admin)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { title, description, image, linkUrl, linkText, isActive } = req.body;
    
    // If setting this one to active, deactivate all others
    if (isActive) {
      await PopupBanner.updateMany({ _id: { $ne: req.params.id } }, { isActive: false });
    }

    const banner = await PopupBanner.findByIdAndUpdate(
      req.params.id,
      { title, description, image, linkUrl, linkText, isActive },
      { new: true }
    );
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE popup banner by ID (Admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const banner = await PopupBanner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.json({ message: 'Banner deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
