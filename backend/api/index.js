// api/index.js - Vercel Serverless Function Handler
import app from '../app.js';
import { connectDB } from '../config/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('[Vercel Serverless Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error: Database Connection Failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
