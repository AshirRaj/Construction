// routes/messageRoutes.js
import express from 'express';
import {
  submitMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage
} from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';
import { publicFormLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.route('/')
  .post(publicFormLimiter, submitMessage)
  .get(protect, getMessages);

router.route('/:id')
  .patch(protect, updateMessageStatus)
  .delete(protect, deleteMessage);

export default router;
