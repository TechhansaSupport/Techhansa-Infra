const express = require('express');
const router = express.Router();
const { login, seedAdmin, register, resetPassword } = require('../controllers/authController');

// @route   POST /api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/login', login);

// @route   POST /api/auth/seed
// @desc    Seed initial admin user
// @access  Public (should be disabled or protected in production)
router.post('/seed', seedAdmin);

// @route   POST /api/auth/register
// @desc    Register a new admin user
// @access  Public (For MVP. Protect in prod)
router.post('/register', register);

// @route   POST /api/auth/reset-password
// @desc    Reset admin password directly
// @access  Public
router.post('/reset-password', resetPassword);

module.exports = router;
