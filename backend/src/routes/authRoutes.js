const express = require('express');
const { register, login, getMe, forgotPassword, resetPassword, updateProfile, changePassword } = require('../controllers/auth/authController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getMe);
router.put('/profile', verifyToken, updateProfile);
router.put('/change-password', verifyToken, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;