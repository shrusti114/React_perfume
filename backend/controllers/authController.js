const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateId = require('../utils/generateId');
const crypto = require('crypto');
const { sendOtpEmail } = require('../services/emailService');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'velvora_jwt_super_secret_2026', { expiresIn: '30d' });
};

/* ──────────────────────────────────────────
   REGISTER
────────────────────────────────────────── */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, shopName, phone } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate Custom String ID
    const prefix = role === 'admin' ? 'A' : (role === 'seller' ? 'S' : 'U');
    const customId = await generateId('userId', prefix);

    // Admins are auto-verified; everyone else needs OTP
    const isVerified = role === 'admin';
    const isEmailVerified = role === 'admin';

    const user = await User.create({
      _id: customId,
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      isVerified,
      isEmailVerified,
      shopName,
      phone,
    });

    if (user) {
      // Immediately send OTP after registration (for non-admins)
      if (!isEmailVerified) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = await bcrypt.hash(otp, 8);
        user.otp = hashedOtp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await user.save();
        await sendOtpEmail(email, otp);
      }

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        message: 'Registration successful. Please check your email for the OTP to verify your account.',
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ──────────────────────────────────────────
   SEND OTP  (can also be used for resend)
────────────────────────────────────────── */
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 8);
    user.otp = hashedOtp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOtpEmail(email, otp);

    res.json({ message: 'OTP sent to your email address.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ──────────────────────────────────────────
   VERIFY OTP
────────────────────────────────────────── */
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email already verified. Please login.' });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
    }

    if (new Date() > user.otpExpiry) {
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }

    // Mark as verified and clear OTP
    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({
      message: 'Email verified successfully! You can now log in.',
      token: generateToken(user._id),
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ──────────────────────────────────────────
   VERIFY EMAIL (legacy token-based — kept for backward compat)
────────────────────────────────────────── */
exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }
    user.isEmailVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ──────────────────────────────────────────
   LOGIN
────────────────────────────────────────── */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Admins are always trusted — auto-heal pre-OTP admin accounts
    if (user.role === 'admin' && !user.isEmailVerified) {
      user.isEmailVerified = true;
      await user.save();
    }

    if (!user.isEmailVerified) {
      // Tell frontend to show the OTP entry step rather than a dead-end error
      return res.status(403).json({
        message: 'Please verify your email with the OTP before logging in.',
        requiresOtp: true,
        email: user.email,
      });
    }

    if (user.role === 'seller' && !user.isVerified) {
      return res.status(403).json({ message: 'Account pending admin approval. Please wait.' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      isEmailVerified: user.isEmailVerified,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
