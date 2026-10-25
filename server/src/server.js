require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const AdminUser = require('./models/AdminUser');
const seedAdminUser = require('./utils/seedAdmin');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Ensure initial admin exists
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      logger.info('No admin user found. Auto-seeding initial administrator account...');
      await seedAdminUser();
    }

    // 3. Start Express HTTP Server
    const server = app.listen(PORT, () => {
      logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      logger.info(`Health check available at http://localhost:${PORT}/api/health`);
    });

    // Graceful Shutdown Handler
    const shutdown = (signal) => {
      logger.info(`${signal} received. Closing HTTP server gracefully...`);
      server.close(() => {
        logger.info('HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.error('Fatal error during server startup:', error.message);
    process.exit(1);
  }
};

startServer();
