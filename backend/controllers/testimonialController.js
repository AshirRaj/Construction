// controllers/testimonialController.js
import mongoose from 'mongoose';
import { Testimonial } from '../models/Testimonial.js';

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) {
      query.status = status;
    }
    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Private
export const createTestimonial = async (req, res, next) => {
  try {
    const initials = req.body.name
      ? req.body.name.split(' ').map((n) => n[0]).join('').toUpperCase()
      : 'BC';

    const testimonialData = {
      ...req.body,
      avatar: req.body.avatar || initials,
      customId: req.body.customId || req.body.id || `test-${Date.now()}`
    };

    const testimonial = await Testimonial.create(testimonialData);
    res.status(201).json({
      success: true,
      data: testimonial,
      message: 'Testimonial created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private
export const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    let testimonial = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      testimonial = await Testimonial.findById(id);
    }
    if (!testimonial) {
      testimonial = await Testimonial.findOne({ customId: id });
    }

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: `Testimonial with identifier '${id}' not found.`
      });
    }

    testimonial = await Testimonial.findByIdAndUpdate(testimonial._id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: testimonial,
      message: 'Testimonial updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private
export const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    let testimonial = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      testimonial = await Testimonial.findById(id);
    }
    if (!testimonial) {
      testimonial = await Testimonial.findOne({ customId: id });
    }

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: `Testimonial with identifier '${id}' not found.`
      });
    }

    await Testimonial.findByIdAndDelete(testimonial._id);

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
