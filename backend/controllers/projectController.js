// controllers/projectController.js
import mongoose from 'mongoose';
import { Project } from '../models/Project.js';

// @desc    Get all construction projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
  try {
    const { category, status } = req.query;
    const query = {};

    if (category && category !== 'All') {
      query.category = new RegExp(`^${category}$`, 'i');
    }
    if (status && status !== 'All') {
      query.status = status;
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project by ID (customId or _id)
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let project = null;

    // Check if valid ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      project = await Project.findById(id);
    }

    // If not found by ObjectId, search by customId
    if (!project) {
      project = await Project.findOne({ customId: id });
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with identifier '${id}' not found in database.`
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req, res, next) => {
  try {
    const projectData = {
      ...req.body,
      customId: req.body.customId || req.body.id || `proj-${Date.now()}`
    };

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    let project = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      project = await Project.findById(id);
    }
    if (!project) {
      project = await Project.findOne({ customId: id });
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with identifier '${id}' not found.`
      });
    }

    project = await Project.findByIdAndUpdate(project._id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: project,
      message: 'Project updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    let project = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      project = await Project.findById(id);
    }
    if (!project) {
      project = await Project.findOne({ customId: id });
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with identifier '${id}' not found.`
      });
    }

    await Project.findByIdAndDelete(project._id);

    res.status(200).json({
      success: true,
      message: 'Project removed successfully from database'
    });
  } catch (error) {
    next(error);
  }
};
