// controllers/settingController.js
import { Setting } from '../models/Setting.js';
import { User } from '../models/User.js';

// @desc    Get company settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }

    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update company settings
// @route   PUT /api/settings
// @access  Private
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create(req.body);
    } else {
      settings = await Setting.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true
      });
    }

    // If adminProfile was updated, also synchronize with User collection
    let updatedAdmin = null;
    if (req.body.adminProfile) {
      const { name, email } = req.body.adminProfile;
      const userUpdate = {};
      if (name) userUpdate.name = name.trim();
      if (email) userUpdate.email = email.trim().toLowerCase();

      if (Object.keys(userUpdate).length > 0) {
        if (req.user && req.user._id) {
          updatedAdmin = await User.findByIdAndUpdate(req.user._id, userUpdate, { new: true });
        } else {
          updatedAdmin = await User.findOneAndUpdate({}, userUpdate, { new: true });
        }
      }
    }

    res.status(200).json({
      success: true,
      data: settings,
      user: updatedAdmin ? {
        id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
        avatar: updatedAdmin.avatar
      } : undefined,
      message: 'Company settings and admin profile updated successfully'
    });
  } catch (error) {
    next(error);
  }
};
