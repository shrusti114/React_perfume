const nodemailer = require('nodemailer');

const createTransporter = () => {
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD &&
      process.env.GMAIL_USER !== 'your-gmail@gmail.com') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  return null;
};

/**
 * Send OTP email via Gmail SMTP.
 * Falls back to console.log if Gmail credentials are not configured.
 */
const sendOtpEmail = async (to, otp) => {
  const transporter = createTransporter();

  if (!transporter) {
    // Console fallback when Gmail is not configured
    console.log('==================================================');
    console.log('  VELVORA — OTP EMAIL (Dev Console Mode)');
    console.log('==================================================');
    console.log(`  To      : ${to}`);
    console.log(`  Subject : Velvora OTP Verification`);
    console.log(`  OTP     : ${otp}`);
    console.log('  (Set GMAIL_USER & GMAIL_APP_PASSWORD in .env to send real emails)');
    console.log('==================================================');
    return { success: true, mode: 'console' };
  }

  const mailOptions = {
    from: `"Velvora Parfum" <${process.env.GMAIL_USER}>`,
    to,
    subject: 'Velvora OTP Verification',
    html: `
      <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; background: #000; color: #fff; padding: 40px; border-radius: 12px;">
        <h1 style="color: #f8c8dc; font-size: 28px; margin-bottom: 4px; letter-spacing: 4px;">VELVORA</h1>
        <p style="color: #888; font-size: 10px; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 32px;">Essence of Luxury</p>
        <hr style="border: none; border-top: 1px solid #222; margin-bottom: 32px;" />
        <p style="color: #ccc; font-size: 16px; margin-bottom: 8px;">Your verification code:</p>
        <div style="font-size: 48px; font-weight: bold; letter-spacing: 12px; color: #f8c8dc; margin: 24px 0; font-family: monospace;">${otp}</div>
        <p style="color: #888; font-size: 13px;">This code expires in <strong style="color:#fff">10 minutes</strong>. Do not share it with anyone.</p>
        <hr style="border: none; border-top: 1px solid #222; margin: 32px 0 16px;" />
        <p style="color: #444; font-size: 11px;">© 2026 Velvora. All rights reserved.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  return { success: true, mode: 'email' };
};

module.exports = { sendOtpEmail };
