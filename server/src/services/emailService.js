const { getTransporter } = require('../config/email');
const logger = require('../utils/logger');

/**
 * Send notification email to Pranshu when a new contact message is received.
 */
const sendContactNotification = async ({ name, email, subject, message, createdAt, messageId }) => {
  try {
    const transporter = getTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || 'palpranshu913@gmail.com';
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const senderUser = process.env.GMAIL_USER || adminEmail;

    const formattedDate = new Date(createdAt || Date.now()).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #1e293b;">
        <h2 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-top: 0;">
          📬 New Portfolio Contact Message
        </h2>
        
        <p style="font-size: 15px; line-height: 1.6;">You have received a new message through your portfolio contact form.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px 12px; background: #f8fafc; font-weight: bold; width: 140px; border: 1px solid #e2e8f0;">From:</td>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${name} &lt;${email}&gt;</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f8fafc; font-weight: bold; border: 1px solid #e2e8f0;">Subject:</td>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f8fafc; font-weight: bold; border: 1px solid #e2e8f0;">Date & Time:</td>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f8fafc; font-weight: bold; border: 1px solid #e2e8f0;">Message ID:</td>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-family: monospace;">${messageId || 'N/A'}</td>
          </tr>
        </table>

        <div style="margin-top: 20px;">
          <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px;">Message Content:</h3>
          <div style="background: #f1f5f9; padding: 16px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #0f172a; border-left: 4px solid #4f46e5;">
${message}
          </div>
        </div>

        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
          <a href="${clientUrl}/admin/login" style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">
            Open Admin Dashboard
          </a>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 15px;">
            You can hit 'Reply' directly to this email to reply to <strong>${email}</strong>.
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Portfolio Contact Form" <${senderUser}>`,
      to: adminEmail,
      replyTo: `"${name}" <${email}>`,
      subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
      text: `New Portfolio Message\n\nFrom: ${name} (${email})\nSubject: ${subject}\nDate: ${formattedDate}\n\nMessage:\n${message}\n\nAdmin Link: ${clientUrl}/admin/login`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Notification email dispatched: ${info.messageId || 'Success'}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error(`Failed to send contact notification email: ${error.message}`);
    return { success: false, error: error.message };
  }
};

/**
 * Send reply from Admin to visitor.
 */
const sendReplyToVisitor = async ({ toEmail, toName, subject, replyMessage, originalMessage }) => {
  try {
    const transporter = getTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || 'palpranshu913@gmail.com';
    const senderUser = process.env.GMAIL_USER || adminEmail;

    const replySubject = subject.startsWith('Re:') ? subject : `Re: ${subject}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #1e293b;">
        <h2 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-top: 0;">
          Pranshu Pal
        </h2>
        <p style="font-size: 14px; color: #64748b; margin-top: -6px;">Software Engineer & MERN Stack Developer</p>
        
        <p style="font-size: 15px; line-height: 1.6; margin-top: 16px;">
          Hi ${toName || 'there'},
        </p>

        <div style="background: #ffffff; padding: 12px 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap; color: #0f172a;">
${replyMessage}
        </div>

        <p style="font-size: 14px; margin-top: 24px; color: #334155;">
          Best regards,<br/>
          <strong>Pranshu Pal</strong><br/>
          <a href="mailto:${adminEmail}" style="color: #4f46e5;">${adminEmail}</a> | 
          <a href="https://www.linkedin.com/in/pranshu-pal/" style="color: #4f46e5;">LinkedIn</a> | 
          <a href="https://github.com/palpranshu1" style="color: #4f46e5;">GitHub</a>
        </p>

        ${originalMessage ? `
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px dashed #cbd5e1;">
          <p style="font-size: 12px; color: #94a3b8; font-weight: bold; margin-bottom: 6px;">--- Original Message ---</p>
          <div style="background: #f8fafc; padding: 12px; border-radius: 4px; font-size: 13px; color: #64748b; white-space: pre-wrap; border-left: 3px solid #cbd5e1;">
${originalMessage}
          </div>
        </div>
        ` : ''}
      </div>
    `;

    const mailOptions = {
      from: `"Pranshu Pal" <${senderUser}>`,
      to: toEmail,
      replyTo: adminEmail,
      subject: replySubject,
      text: `${replyMessage}\n\n---\nBest regards,\nPranshu Pal\n${adminEmail}`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Reply email sent to ${toEmail}: ${info.messageId || 'Success'}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error(`Failed to send reply email: ${error.message}`);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendContactNotification,
  sendReplyToVisitor,
};
