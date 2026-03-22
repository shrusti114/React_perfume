const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateId = require('../utils/generateId');
const crypto = require('crypto');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '30d' });
};

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

    // Generate Verification Token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Ensure admins are automatically verified (both email and admin verify)
    const isVerified = role === 'admin' ? true : false;
    const isEmailVerified = role === 'admin' ? true : false;

    const user = await User.create({
      _id: customId,
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      isVerified,
      isEmailVerified,
      verificationToken,
      shopName,
      phone
    });

    if (user) {
      // Mock Email Sending
      console.log('--------------------------------------------------');
      console.log(`To: ${user.email}`);
      console.log('Subject: Verify your Westion Account');
      console.log(`Link: http://localhost:5173/verify-email/${verificationToken}`);
      console.log('--------------------------------------------------');

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        message: 'Registration successful. Please check your email to verify your account.'
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      
      if (!user.isEmailVerified) {
        return res.status(403).json({ message: 'Please verify your email before logging in.' });
      }

      // Strict Verify Check (Admin approval for sellers)
      if (user.role === 'seller' && !user.isVerified) {
        return res.status(403).json({ message: 'Account pending admin approval. Please wait to be verified.' });
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
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
