const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { createNotification } = require('./notificationController');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -otp -otpExpiry -verificationToken');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      phone: user.phone,
      gender: user.gender,
      dob: user.dob,
      shopName: user.shopName,
      bio: user.bio,
      address: user.address,
      profileImage: user.profileImage,
      isVerified: user.isVerified,
      isEmailVerified: user.isEmailVerified,
      created_at: user.created_at,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, username, gender, dob, email, phone, shopName, bio, address, profileImage } = req.body;
    
    // Find user directly by authenticated string ID mapped by JWT
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = name || user.name;
      user.username = username !== undefined ? username : user.username;
      user.gender = gender !== undefined ? gender : user.gender;
      user.dob = dob !== undefined ? dob : user.dob;
      user.email = email || user.email;
      user.phone = phone !== undefined ? phone : user.phone;
      user.bio = bio !== undefined ? bio : user.bio;
      user.address = address !== undefined ? address : user.address;
      user.profileImage = profileImage !== undefined ? profileImage : user.profileImage;
      
      if (user.role === 'seller') {
        user.shopName = shopName || user.shopName;
      }

      const updatedUser = await user.save();

      // Trigger notification
      await createNotification(
        req.user._id, 
        `Profile Updated: Your account details have been saved successfully.`,
        'success'
      );

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        gender: updatedUser.gender,
        dob: updatedUser.dob,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        shopName: updatedUser.shopName,
        bio: updatedUser.bio,
        address: updatedUser.address,
        profileImage: updatedUser.profileImage,
        isVerified: updatedUser.isVerified,
        created_at: updatedUser.created_at,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (user && (await bcrypt.compare(currentPassword, user.password))) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(401).json({ message: 'Invalid current password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
