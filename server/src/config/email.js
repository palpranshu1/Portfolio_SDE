const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (user && pass && pass !== 'your_google_app_password') {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });
    logger.info(`Email transporter initialized for Gmail account: ${user}`);
  } else {
    logger.warn('GMAIL_USER or GMAIL_APP_PASSWORD not configured. Emails will be logged to console in mock/dry-run mode.');
    // Dry-run / mock transport
    transporter = {
      sendMail: async (mailOptions) => {
        logger.info('[Mock Email Transport] Email would have been sent:');
        logger.info(`  To: ${mailOptions.to}`);
        logger.info(`  Subject: ${mailOptions.subject}`);
        logger.info(`  Reply-To: ${mailOptions.replyTo}`);
        return { messageId: `mock-${Date.now()}` };
      },
      verify: async () => true,
    };
  }

  return transporter;
};

module.exports = {
  getTransporter,
};
