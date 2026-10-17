// controllers/messageController.js
import mongoose from 'mongoose';
import { Message } from '../models/Message.js';

// @desc    Submit a contact message
// @route   POST /api/messages
// @access  Public
export const submitMessage = async (req, res, next) => {
  try {
    const messageData = {
      ...req.body,
      customId: req.body.customId || `msg-${Date.now()}`,
      date: req.body.date || new Date().toISOString().split('T')[0],
      status: 'Unread'
    };

    const message = await Message.create(messageData);

    res.status(201).json({
      success: true,
      data: message,
      message: 'Contact message sent successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/messages
// @access  Private
export const getMessages = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status && status !== 'All') {
      query.status = status;
    }

    const messages = await Message.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update message status (e.g. Read, Replied, Unread)
// @route   PATCH /api/messages/:id
// @access  Private
export const updateMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    let message = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      message = await Message.findById(id);
    }
    if (!message) {
      message = await Message.findOne({ customId: id });
    }

    if (!message) {
      return res.status(404).json({
        success: false,
        message: `Message with identifier '${id}' not found.`
      });
    }

    message.status = status || message.status;
    await message.save();

    res.status(200).json({
      success: true,
      data: message,
      message: `Message status updated to ${message.status}`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    let message = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      message = await Message.findById(id);
    }
    if (!message) {
      message = await Message.findOne({ customId: id });
    }

    if (!message) {
      return res.status(404).json({
        success: false,
        message: `Message with identifier '${id}' not found.`
      });
    }

    await Message.findByIdAndDelete(message._id);

    res.status(200).json({
      success: true,
      message: 'Message removed successfully'
    });
  } catch (error) {
    next(error);
  }
};
