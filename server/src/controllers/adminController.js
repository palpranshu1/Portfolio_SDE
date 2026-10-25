const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const ContactMessage = require('../models/ContactMessage');
const emailService = require('../services/emailService');
const logger = require('../utils/logger');

// Generate JWT Helper
const generateToken = (adminId) => {
  const secret = process.env.JWT_SECRET || 'pranshu_portfolio_super_secure_jwt_secret_key_2026';
  return jwt.sign({ id: adminId }, secret, {
    expiresIn: '7d',
  });
};

// Set cookie helper
const setAuthCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

/**
 * Admin Login
 * Route: POST /api/admin/login
 * Access: Public (rate-limited)
 */
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const admin = await AdminUser.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin._id);
    setAuthCookie(res, token);

    logger.info(`Admin successfully logged in: ${admin.email}`);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin Logout
 * Route: POST /api/admin/logout
 * Access: Protected
 */
const logoutAdmin = (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
};

/**
 * Get Current Admin Profile
 * Route: GET /api/admin/me
 * Access: Protected
 */
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: {
      id: req.admin._id,
      email: req.admin.email,
      name: req.admin.name,
      role: req.admin.role,
      lastLogin: req.admin.lastLogin,
    },
  });
};

/**
 * Get Message Statistics (Real database-derived counts)
 * Route: GET /api/admin/stats
 * Access: Protected
 */
const getMessageStats = async (req, res, next) => {
  try {
    const total = await ContactMessage.countDocuments();
    const newCount = await ContactMessage.countDocuments({ status: 'new' });
    const readCount = await ContactMessage.countDocuments({ status: 'read' });
    const repliedCount = await ContactMessage.countDocuments({ status: 'replied' });

    res.status(200).json({
      success: true,
      stats: {
        total,
        new: newCount,
        read: readCount,
        replied: repliedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Paginated & Filtered Contact Messages
 * Route: GET /api/admin/messages
 * Access: Protected
 */
const getMessages = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const { status, search } = req.query;

    const query = {};

    // Filter by status if provided and valid
    if (status && ['new', 'read', 'replied'].includes(status)) {
      query.status = status;
    }

    // Search query across name, email, or subject
    if (search && search.trim() !== '') {
      const sanitizedSearch = search.trim();
      query.$or = [
        { name: { $regex: sanitizedSearch, $options: 'i' } },
        { email: { $regex: sanitizedSearch, $options: 'i' } },
        { subject: { $regex: sanitizedSearch, $options: 'i' } },
      ];
    }

    const [messages, totalMessages] = await Promise.all([
      ContactMessage.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ContactMessage.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalMessages / limit) || 1;

    res.status(200).json({
      success: true,
      messages,
      pagination: {
        page,
        limit,
        totalMessages,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Single Message by ID
 * Route: GET /api/admin/messages/:id
 * Access: Protected
 */
const getMessageById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message ID format.',
      });
    }

    const message = await ContactMessage.findById(id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    // Auto-mark as 'read' if it was 'new' when viewed
    if (message.status === 'new') {
      message.status = 'read';
      await message.save();
    }

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Message Status
 * Route: PATCH /api/admin/messages/:id
 * Access: Protected
 */
const updateMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message ID format.',
      });
    }

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed values: 'new', 'read', 'replied'.",
      });
    }

    const updateFields = { status };
    if (status === 'replied') {
      updateFields.repliedAt = new Date();
    }

    const updatedMessage = await ContactMessage.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: `Message status updated to '${status}'.`,
      data: updatedMessage,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a Contact Message
 * Route: DELETE /api/admin/messages/:id
 * Access: Protected
 */
const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message ID format.',
      });
    }

    const deletedMessage = await ContactMessage.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    logger.info(`Message deleted: ID=${id}`);

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Send Email Reply to Visitor
 * Route: POST /api/admin/messages/:id/reply
 * Access: Protected
 */
const replyToMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { replyMessage, replySubject } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message ID format.',
      });
    }

    if (!replyMessage || typeof replyMessage !== 'string' || replyMessage.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Reply message cannot be empty.',
      });
    }

    const message = await ContactMessage.findById(id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    // Send email via emailService
    const emailResult = await emailService.sendReplyToVisitor({
      toEmail: message.email,
      toName: message.name,
      subject: replySubject || message.subject,
      replyMessage: replyMessage.trim(),
      originalMessage: message.message,
    });

    if (!emailResult.success) {
      return res.status(502).json({
        success: false,
        message: `Failed to deliver reply email: ${emailResult.error}`,
      });
    }

    // Update message state only after successful email dispatch
    message.status = 'replied';
    message.repliedAt = new Date();
    message.replyDetails = {
      repliedBy: req.admin.email,
      replyMessage: replyMessage.trim(),
      sentAt: new Date(),
    };
    await message.save();

    logger.info(`Reply sent to ${message.email} for message ${id}`);

    res.status(200).json({
      success: true,
      message: 'Reply sent successfully.',
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginAdmin,
  logoutAdmin,
  getMe,
  getMessageStats,
  getMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
  replyToMessage,
};
