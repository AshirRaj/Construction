// controllers/quoteController.js
import mongoose from 'mongoose';
import { QuoteRequest } from '../models/QuoteRequest.js';

// @desc    Submit a quote request
// @route   POST /api/quotes
// @access  Public
export const submitQuote = async (req, res, next) => {
  try {
    const quoteData = {
      ...req.body,
      customId: req.body.customId || `quote-${Date.now()}`,
      date: req.body.date || new Date().toISOString().split('T')[0],
      status: 'New'
    };

    const quote = await QuoteRequest.create(quoteData);

    res.status(201).json({
      success: true,
      data: quote,
      message: 'Quote request submitted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all quote requests
// @route   GET /api/quotes
// @access  Private
export const getQuotes = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status && status !== 'All') {
      query.status = status;
    }

    const quotes = await QuoteRequest.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single quote by ID
// @route   GET /api/quotes/:id
// @access  Private
export const getQuoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let quote = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      quote = await QuoteRequest.findById(id);
    }
    if (!quote) {
      quote = await QuoteRequest.findOne({ customId: id });
    }

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: `Quote with identifier '${id}' not found.`
      });
    }

    res.status(200).json({
      success: true,
      data: quote
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update quote request status
// @route   PATCH /api/quotes/:id
// @access  Private
export const updateQuoteStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    let quote = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      quote = await QuoteRequest.findById(id);
    }
    if (!quote) {
      quote = await QuoteRequest.findOne({ customId: id });
    }

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: `Quote with identifier '${id}' not found.`
      });
    }

    quote.status = status || quote.status;
    await quote.save();

    res.status(200).json({
      success: true,
      data: quote,
      message: `Quote status updated to ${quote.status}`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete quote request
// @route   DELETE /api/quotes/:id
// @access  Private
export const deleteQuote = async (req, res, next) => {
  try {
    const { id } = req.params;
    let quote = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      quote = await QuoteRequest.findById(id);
    }
    if (!quote) {
      quote = await QuoteRequest.findOne({ customId: id });
    }

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: `Quote with identifier '${id}' not found.`
      });
    }

    await QuoteRequest.findByIdAndDelete(quote._id);

    res.status(200).json({
      success: true,
      message: 'Quote request deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
