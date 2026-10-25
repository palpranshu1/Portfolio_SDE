const validator = require('validator');

const validateContactInput = (req, res, next) => {
  const { name, email, subject, message, _gotcha } = req.body;

  // 1. Honeypot check: If the hidden honeypot field is filled, silently ignore or reject
  if (_gotcha && _gotcha.trim() !== '') {
    return res.status(200).json({
      success: true,
      message: 'Message received successfully.',
    });
  }

  const errors = [];

  // 2. Validate Name
  if (!name || typeof name !== 'string' || validator.isEmpty(name.trim())) {
    errors.push('Full name is required.');
  } else if (!validator.isLength(name.trim(), { min: 2, max: 100 })) {
    errors.push('Name must be between 2 and 100 characters.');
  }

  // 3. Validate Email
  if (!email || typeof email !== 'string' || validator.isEmpty(email.trim())) {
    errors.push('Email address is required.');
  } else if (!validator.isEmail(email.trim())) {
    errors.push('Please provide a valid email address.');
  } else if (email.trim().length > 150) {
    errors.push('Email address cannot exceed 150 characters.');
  }

  // 4. Validate Subject
  if (!subject || typeof subject !== 'string' || validator.isEmpty(subject.trim())) {
    errors.push('Subject is required.');
  } else if (!validator.isLength(subject.trim(), { min: 3, max: 200 })) {
    errors.push('Subject must be between 3 and 200 characters.');
  }

  // 5. Validate Message
  if (!message || typeof message !== 'string' || validator.isEmpty(message.trim())) {
    errors.push('Message is required.');
  } else if (!validator.isLength(message.trim(), { min: 10, max: 3000 })) {
    errors.push('Message must be between 10 and 3000 characters.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors[0],
      errors,
    });
  }

  // Clean and sanitize strings (escaping HTML to prevent stored XSS)
  req.sanitizedBody = {
    name: validator.escape(name.trim()),
    email: validator.normalizeEmail(email.trim()),
    subject: validator.escape(subject.trim()),
    message: validator.escape(message.trim()),
  };

  next();
};

module.exports = {
  validateContactInput,
};
