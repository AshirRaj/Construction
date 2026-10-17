// routes/index.js
import express from 'express';
import authRoutes from './authRoutes.js';
import projectRoutes from './projectRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import testimonialRoutes from './testimonialRoutes.js';
import quoteRoutes from './quoteRoutes.js';
import messageRoutes from './messageRoutes.js';
import settingRoutes from './settingRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';

const router = express.Router();

import mongoose from 'mongoose';

// Health Check Endpoint - Verifies API status and live MongoDB Atlas connection
router.get('/health', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };

  const isDbConnected = dbState === 1;

  res.status(isDbConnected ? 200 : 503).json({
    status: isDbConnected ? 'Healthy' : 'Degraded',
    message: isDbConnected
      ? 'BuildCore Construction API & Database are operational'
      : 'Database connection issue detected',
    database: {
      status: dbStatusMap[dbState] || 'Unknown',
      host: mongoose.connection.host || 'Not connected',
      name: mongoose.connection.name || 'Not connected'
    },
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Mounted Routes
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/services', serviceRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/quotes', quoteRoutes);
router.use('/messages', messageRoutes);
router.use('/settings', settingRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
