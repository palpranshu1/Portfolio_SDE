const express = require('express');
const router = express.Router();
const {
  loginAdmin,
  logoutAdmin,
  getMe,
  getMessageStats,
  getMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
  replyToMessage,
} = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/authMiddleware');
const { loginLimiter } = require('../middleware/rateLimiter');

// Public admin route (Rate-limited)
router.post('/login', loginLimiter, loginAdmin);

// Protected admin routes
router.post('/logout', protectAdmin, logoutAdmin);
router.get('/me', protectAdmin, getMe);
router.get('/stats', protectAdmin, getMessageStats);
router.get('/messages', protectAdmin, getMessages);
router.get('/messages/:id', protectAdmin, getMessageById);
router.patch('/messages/:id', protectAdmin, updateMessageStatus);
router.delete('/messages/:id', protectAdmin, deleteMessage);
router.post('/messages/:id/reply', protectAdmin, replyToMessage);

module.exports = router;
