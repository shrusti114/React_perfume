const nodemailer = require('nodemailer');

const createTransporter = async () => {
  // Use Gmail if configured correctly in .env
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD &&
      process.env.GMAIL_USER !== 'your-gmail@gmail.com') {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      await transporter.verify();
      return transporter;
    } catch (e) {
      // Fallback to port 587 if 465 fails
      const transporter587 = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      await transporter587.verify();
      return transporter587;
    }
  }
  
  throw new Error('Email service is not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in .env');
};

/**
 * Send OTP email via configured Gmail SMTP
 */
const sendOtpEmail = async (to, otp) => {
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: `"Velvora Parfum" <${process.env.GMAIL_USER}>`,
      to,
      subject: 'Velvora OTP Verification',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 480px; margin: 0 auto; background: #0b0b0b; color: #ffffff; padding: 40px; border-radius: 12px; border: 1px solid #1a1a1a;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffffff; font-size: 28px; margin: 0; letter-spacing: 6px; font-weight: 300;">VELVORA</h1>
            <p style="color: #666; font-size: 10px; text-transform: uppercase; letter-spacing: 4px; margin: 8px 0 0;">Essence of Luxury</p>
          </div>
          <div style="background: #111; padding: 30px; border-radius: 8px; border: 1px solid #222; text-align: center;">
            <p style="color: #aaa; font-size: 16px; margin-bottom: 20px;">Use this code to verify your account:</p>
            <div style="font-size: 42px; font-weight: bold; letter-spacing: 10px; color: #f8c8dc; margin: 20px 0; font-family: 'Courier New', Courier, monospace;">${otp}</div>
            <p style="color: #666; font-size: 13px; margin-top: 20px;">Verification code is valid for 20 minutes.</p>
          </div>
          <hr style="border: none; border-top: 1px solid #222; margin: 30px 0;" />
          <p style="color: #444; font-size: 11px; text-align: center;">If you didn't request this email, please ignore it.</p>
          <p style="color: #444; font-size: 11px; text-align: center; margin-top: 10px;">© 2026 VELVORA. All rights reserved.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL] OTP sent successfully to ${to} (MessageID: ${info.messageId})`);
    return { success: true };
  } catch (error) {
    console.error('[EMAIL] SendMail Error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send Order Update Email (Confirmation or Status Change)
 */
const sendOrderStatusEmail = async (to, order) => {
  try {
    console.log(`[EMAIL] Preparing order email for ${to} (Order: ${order?._id})`);
    if (!order) throw new Error('Order data is missing');

    const transporter = await createTransporter();
    const isPlaced = order.status === 'Placed';
    const displayStatus = isPlaced ? 'Pending' : order.status;
    const productNames = order.products?.map(p => p.productId?.name || 'Fragrance').join(', ') || 'Luxury Collection';
    const totalAmount = order.totalAmount || 0;

    const mailOptions = {
      from: `"Velvora Team" <${process.env.GMAIL_USER}>`,
      to,
      subject: `Order Update - #${order._id}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6; border: 1px solid #eee; padding: 40px; border-radius: 16px;">
          <h2 style="color: #000; font-weight: normal; margin-bottom: 20px;">Dear Customer,</h2>
          
          <p>Thank you for your order at <strong>Velvora</strong>.</p>
          <p>Your order has been successfully placed.</p>

          <div style="background: #f9f9f9; padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid #eee;">
            <h3 style="margin-top: 0; color: #000; font-size: 16px;">Order Details:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 10px;"><strong>Order ID:</strong> #${order._id}</li>
              <li style="margin-bottom: 10px;"><strong>Product:</strong> ${productNames}</li>
              <li style="margin-bottom: 10px;"><strong>Total Amount:</strong> ₹${totalAmount.toLocaleString('en-IN')}</li>
              <li style="margin-bottom: 0;"><strong>Status:</strong> ${displayStatus}</li>
            </ul>
          </div>

          <p>You can track your order using your Order ID on our website.</p>
          <p style="margin-bottom: 40px;">We will notify you when your order status is updated.</p>

          <p>Thank you for shopping with us!</p>
          <br/>
          <p>Regards,<br/><strong>Velvora Team</strong></p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0 20px;" />
          <p style="font-size: 11px; color: #999; text-align: center;">
            © 2026 Velvora Parfum. All rights reserved.<br/>
            This is an automated notification. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL] Order ${order.status} sent successfully to ${to} (ID: ${info.messageId})`);
    return { success: true };
  } catch (error) {
    console.error('[EMAIL] Order Error Dispatch Failure:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendOtpEmail, sendOrderStatusEmail };

