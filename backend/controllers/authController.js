const User = require('../models/User');
const PendingUser = require('../models/PendingUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateId = require('../utils/generateId');
const crypto = require('crypto');
const { sendOtpEmail } = require('../services/emailService');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'velvora_jwt_super_secret_2026', { expiresIn: '30d' });
};

/* ──────────────────────────────────────────
   REGISTER (Now stores in PendingUser)
────────────────────────────────────────── */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, shopName, phone } = req.body;

    // 1. Check if user already exists in main collection
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered. Please login.' });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 8);
    const otpExpiry = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes

    // 4. Store in PendingUser (Upsert if they try again)
    await PendingUser.findOneAndUpdate(
      { email },
      {
        name,
        email,
        password: hashedPassword,
        role: role || 'user',
        shopName,
        phone,
        otp: hashedOtp,
        otpExpiry
      },
      { upsert: true, new: true }
    );

    // 5. Send OTP Email
    await sendOtpEmail(email, otp);

    res.status(201).json({
      email,
      message: 'OTP sent to your email. Please verify to complete registration.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ──────────────────────────────────────────
   SEND OTP / RESEND (Now searches PendingUser)
────────────────────────────────────────── */
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    // Look for the user in the pending list
    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) {
      return res.status(404).json({ message: 'Registration session not found or expired. Please register again.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 8);
    
    pendingUser.otp = hashedOtp;
    pendingUser.otpExpiry = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes
    await pendingUser.save();

    await sendOtpEmail(email, otp);

    res.json({ message: 'A new OTP has been sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ──────────────────────────────────────────
   VERIFY OTP & REGISTER (Final Step)
────────────────────────────────────────── */
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    // 1. Find the pending registration
    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) {
      return res.status(404).json({ message: 'Registration expired or not found. Please register again.' });
    }

    // 2. Check Expiry
    if (new Date() > pendingUser.otpExpiry) {
      await PendingUser.deleteOne({ email });
      return res.status(400).json({ message: 'OTP has expired. Please register again.' });
    }

    // 3. Verify OTP
    const isMatch = await bcrypt.compare(otp, pendingUser.otp);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }

    // 4. Generate Official Custom ID
    const prefix = pendingUser.role === 'admin' ? 'A' : (pendingUser.role === 'seller' ? 'S' : 'U');
    const customId = await generateId('userId', prefix);

    // 5. Create Real User
    const user = await User.create({
      _id: customId,
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password, // Already hashed
      role: pendingUser.role,
      phone: pendingUser.phone,
      shopName: pendingUser.shopName,
      isEmailVerified: true,
      isVerified: pendingUser.role === 'admin', // Admins auto-verified, sellers need approval
    });

    // 6. Cleanup Pending Record
    await PendingUser.deleteOne({ email });

    // 7. Success Response with Token
    res.json({
      message: 'Registration successful! Welcome to Velvora.',
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
    console.log(`Login attempt for email: ${email}`);

    if (!user) {
      console.log('Login failed: User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(`Password match for ${email}: ${passwordMatch}`);

    if (!passwordMatch) {
      console.log('Login failed: Incorrect password');
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

    // Temporarily disabled so new sellers can log in and test their dashboard
    // if (user.role === 'seller' && !user.isVerified) {
    //   return res.status(403).json({ message: 'Account pending admin approval. Please wait.' });
    // }

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
