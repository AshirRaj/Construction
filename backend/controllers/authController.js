// controllers/authController.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Setting } from '../models/Setting.js';

// Helper to generate JWT and send response with HTTP-only cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'buildcore_super_secret_jwt_key_2026_construction_production',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  };

  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    token
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      user: userData,
      token
    });
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both administrator email and password'
      });
    }

    // Check for user (including password field)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email credentials or account does not exist'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password credentials provided'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Admin logout / Clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logout = async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  });

  res.status(200).json({
    success: true,
    message: 'Administrator logged out successfully'
  });
};

// @desc    Get current logged in administrator
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password (requires email, current password, and new password)
// @route   POST /api/auth/reset-password
// @access  Public / Private
export const resetPasswordWithCurrent = async (req, res, next) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    // Use email from body or logged-in user session
    const targetEmail = email || req.user?.email;

    if (!targetEmail || !currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, current password, and new password'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    const user = await User.findOne({ email: targetEmail.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No administrator account found with this email address'
      });
    }

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect. Verification failed.'
      });
    }

    // Update password (triggers pre-save bcrypt hash)
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Administrator password has been reset successfully. You can now log in with your new password.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin profile (name and email)
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;

    const updateFields = {};
    if (name) updateFields.name = name.trim();
    if (email) updateFields.email = email.trim().toLowerCase();

    // Check if new email is taken by another user
    if (email) {
      const existingUser = await User.findOne({ email: email.trim().toLowerCase(), _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'That email address is already in use by another account'
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      runValidators: true
    });

    // Also sync with Setting collection's adminProfile
    await Setting.findOneAndUpdate(
      {},
      {
        'adminProfile.name': updatedUser.name,
        'adminProfile.email': updatedUser.email
      }
    );

    res.status(200).json({
      success: true,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar
      },
      message: 'Admin profile name and email updated successfully'
    });
  } catch (error) {
    next(error);
  }
};
