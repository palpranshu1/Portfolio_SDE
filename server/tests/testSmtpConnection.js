const path = require('path');
// Ensure dotenv is loaded with explicit path to server/.env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const nodemailer = require('nodemailer');

async function testSmtp() {
  console.log('--- Testing Current SMTP Configuration ---');
  const user = process.env.GMAIL_USER ? process.env.GMAIL_USER.trim() : '';
  const rawPass = process.env.GMAIL_APP_PASSWORD || '';
  const cleanPass = rawPass.trim().replace(/\s+/g, '').replace(/^["']|["']$/g, '');

  console.log('GMAIL_USER present:', !!user, '| length:', user.length);
  console.log('GMAIL_APP_PASSWORD present:', !!rawPass, '| length:', cleanPass.length);
  console.log('Is 16 characters:', cleanPass.length === 16);

  if (!user || !cleanPass) {
    console.log('Error: Missing GMAIL_USER or GMAIL_APP_PASSWORD.');
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user,
      pass: cleanPass,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  try {
    console.log('Attempting transporter.verify() with smtp.gmail.com:465...');
    await transporter.verify();
    console.log('✅ SMTP AUTHENTICATION SUCCESSFUL! Google accepted the credentials.');
  } catch (error) {
    console.error('❌ SMTP AUTHENTICATION FAILED:');
    console.error('Error Code:', error.code);
    console.error('Response Code:', error.responseCode);
    console.error('Server Response:', error.response);
    console.error('Message:', error.message);
  }
}

testSmtp();
