const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const logger = require('../utils/logger');

const protectAdmin = async (req, res, next) => {
  try {
    let token = null;

    // 1. Check HTTP-only cookie
    if (req.cookies && (req.cookies.token || req.cookies.adminToken)) {
      token = req.cookies.token || req.cookies.adminToken;
    }

    // 2. Check Authorization Bearer header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. No token provided.',
      });
    }

    const jwtSecret = process.env.JWT_SECRET || 'pranshu_portfolio_super_secure_jwt_secret_key_2026';
    const decoded = jwt.verify(token, jwtSecret);

    // Verify admin user still exists in database
    const admin = await AdminUser.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid session. Admin user no longer exists.',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    logger.debug(`Auth verification error: ${error.message}`);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please log in again.',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid or forged authentication token.',
    });
  }
};

module.exports = {
  protectAdmin,
};
