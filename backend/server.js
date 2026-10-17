// server.js
import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB then start Express server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[Server] BuildCore Construction Backend running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
      console.log(`[Server] API Health check available at: http://localhost:${PORT}/api/health`);
    });
  })
  .catch((err) => {
    console.error(`[Server Error] Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Server Error] Unhandled Rejection: ${err.message}`);
});
