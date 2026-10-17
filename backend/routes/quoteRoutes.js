// routes/quoteRoutes.js
import express from 'express';
import {
  submitQuote,
  getQuotes,
  getQuoteById,
  updateQuoteStatus,
  deleteQuote
} from '../controllers/quoteController.js';
import { protect } from '../middleware/auth.js';
import { publicFormLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.route('/')
  .post(publicFormLimiter, submitQuote)
  .get(protect, getQuotes);

router.route('/:id')
  .get(protect, getQuoteById)
  .patch(protect, updateQuoteStatus)
  .delete(protect, deleteQuote);

export default router;
