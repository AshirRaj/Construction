// middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

// Rate limiter for login endpoint (e.g. 20 attempts per 15 minutes)
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: 'Too many login attempts from this IP address. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter for public inquiry submissions (e.g. 30 requests per hour)
export const publicFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: {
    success: false,
    message: 'Too many submissions from this IP. Please wait a while before submitting again.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
