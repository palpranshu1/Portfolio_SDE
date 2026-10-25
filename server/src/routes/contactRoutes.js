const express = require('express');
const router = express.Router();
const { submitContactMessage } = require('../controllers/contactController');
const { contactLimiter } = require('../middleware/rateLimiter');
const { validateContactInput } = require('../validators/contactValidator');

// Apply rate limiter and validation to public contact submission
router.post('/contact', contactLimiter, validateContactInput, submitContactMessage);

module.exports = router;
