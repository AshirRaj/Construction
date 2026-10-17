// controllers/serviceController.js
import mongoose from 'mongoose';
import { Service } from '../models/Service.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private
export const createService = async (req, res, next) => {
  try {
    const serviceData = {
      ...req.body,
      customId: req.body.customId || req.body.id || `serv-${Date.now()}`
    };

    const service = await Service.create(serviceData);
    res.status(201).json({
      success: true,
      data: service,
      message: 'Service created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    let service = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      service = await Service.findById(id);
    }
    if (!service) {
      service = await Service.findOne({ customId: id });
    }

    if (!service) {
      return res.status(404).json({
        success: false,
        message: `Service with identifier '${id}' not found.`
      });
    }

    service = await Service.findByIdAndUpdate(service._id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: service,
      message: 'Service updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private
export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    let service = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      service = await Service.findById(id);
    }
    if (!service) {
      service = await Service.findOne({ customId: id });
    }

    if (!service) {
      return res.status(404).json({
        success: false,
        message: `Service with identifier '${id}' not found.`
      });
    }

    await Service.findByIdAndDelete(service._id);

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
