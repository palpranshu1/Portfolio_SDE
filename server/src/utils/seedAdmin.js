require('dotenv').config();
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');
const logger = require('./logger');

const seedAdminUser = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pranshu_portfolio';
    await mongoose.connect(mongoURI);
    logger.info('Connected to MongoDB for admin seeding.');

    const adminEmail = (process.env.ADMIN_EMAIL || 'palpranshu913@gmail.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || 'Admin@Pranshu2026!';

    let admin = await AdminUser.findOne({ email: adminEmail });

    const hashedPassword = await AdminUser.hashPassword(adminPassword);

    if (admin) {
      admin.password = hashedPassword;
      admin.name = 'Pranshu Pal';
      await admin.save();
      logger.info(`Existing admin updated successfully: ${adminEmail}`);
    } else {
      admin = await AdminUser.create({
        email: adminEmail,
        password: hashedPassword,
        name: 'Pranshu Pal',
        role: 'admin',
      });
      logger.info(`New admin user created successfully: ${adminEmail}`);
    }

    logger.info('Admin seed complete.');
    if (require.main === module) {
      await mongoose.disconnect();
      process.exit(0);
    }
    return admin;
  } catch (error) {
    logger.error('Failed to seed admin:', error.message);
    if (require.main === module) {
      process.exit(1);
    }
    throw error;
  }
};

if (require.main === module) {
  seedAdminUser();
}

module.exports = seedAdminUser;
