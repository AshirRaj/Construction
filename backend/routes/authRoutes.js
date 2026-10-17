// routes/authRoutes.js
import express from 'express';
import {
  login,
  logout,
  getMe,
  resetPasswordWithCurrent,
  updateProfile
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.post('/reset-password', resetPasswordWithCurrent);
router.put('/profile', protect, updateProfile);

export default router;
