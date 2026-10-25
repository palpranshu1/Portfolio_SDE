const ContactMessage = require('../models/ContactMessage');
const emailService = require('../services/emailService');
const logger = require('../utils/logger');

/**
 * Handle new contact form submission.
 * Route: POST /api/contact
 * Access: Public
 */
const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.sanitizedBody;
    const clientIp = req.ip || req.connection.remoteAddress;

    // Check for accidental duplicate submission within last 60 seconds
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const existingRecentMessage = await ContactMessage.findOne({
      email,
      subject,
      message,
      createdAt: { $gte: oneMinuteAgo },
    });

    if (existingRecentMessage) {
      return res.status(200).json({
        success: true,
        message: 'Your message has already been received. Thank you!',
        data: {
          id: existingRecentMessage._id,
          createdAt: existingRecentMessage.createdAt,
        },
      });
    }

    // 1. Save to MongoDB
    const newMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
      status: 'new',
      ipAddress: clientIp,
      emailNotificationSent: false,
    });

    logger.info(`New contact message saved: ID=${newMessage._id} from=${email}`);

    // 2. Dispatch email notification asynchronously without blocking DB success
    // As per requirement: DB saving and email delivery are separate operations.
    // If DB save succeeds but email fails, retain message and report internally.
    emailService
      .sendContactNotification({
        name,
        email,
        subject,
        message,
        createdAt: newMessage.createdAt,
        messageId: newMessage._id.toString(),
      })
      .then(async (emailResult) => {
        if (emailResult.success) {
          await ContactMessage.findByIdAndUpdate(newMessage._id, {
            emailNotificationSent: true,
            emailError: null,
          });
        } else {
          await ContactMessage.findByIdAndUpdate(newMessage._id, {
            emailNotificationSent: false,
            emailError: emailResult.error || 'Email notification delivery failed',
          });
          logger.warn(`Email notification failed for message ${newMessage._id}: ${emailResult.error}`);
        }
      })
      .catch((err) => {
        logger.error(`Unexpected error sending email notification: ${err.message}`);
      });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. I will get back to you soon.',
      data: {
        id: newMessage._id,
        createdAt: newMessage.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContactMessage,
};
