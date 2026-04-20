const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');
const Payment = require('../models/Payment');
const Feedback = require('../models/Feedback');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin Login (using User model with role check)
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.role !== 'admin') {
      return res.status(401).json({ message: 'Access denied. Only admins can login here.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalSellers = await User.countDocuments({ role: 'seller' });
    const pendingSellers = await User.countDocuments({ role: 'seller', isVerified: false });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const activeOrders = await Order.countDocuments({ status: { $in: ['Pending', 'Processing', 'Shipped'] } });
    const totalFeedback = await Feedback.countDocuments();
    
    const totalRevenueResult = await Order.aggregate([
      { $match: { status: 'Delivered' } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    // Monthly Sales for Chart
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$created_at" },
          sales: { $sum: "$totalAmount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      stats: {
        totalUsers,
        totalSellers,
        pendingSellers,
        totalProducts,
        totalOrders,
        activeOrders,
        totalRevenue,
        totalFeedback
      },
      monthlySales
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Manage Users
exports.getAllUsers = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, role } = req.query;
    const query = role ? { role } : { role: { $ne: 'admin' } };
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ created_at: -1 });

    const total = await User.countDocuments(query);

    res.json({ users, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.status = status;
    await user.save();
    res.json({ success: true, message: `User status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Seller Management
exports.approveSeller = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'seller') return res.status(404).json({ message: 'Seller not found' });

    user.isVerified = true;
    user.status = 'active';
    await user.save();
    res.json({ success: true, message: 'Seller approved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Feedback Management
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('userId', 'name email')
      .populate('productId', 'name')
      .sort({ created_at: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Feedback deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Payment Management
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate({
        path: 'order_id',
        populate: { path: 'userId', select: 'name email' }
      })
      .sort({ payment_date: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Direct User Deletion
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete an administrator' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User and associated records removed from registry' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Notification Dispatch
exports.sendNotification = async (req, res) => {
  try {
    const { userId, message, type, actionUrl } = req.body;
    const { createNotification } = require('./notificationController');
    
    if (userId === 'all') {
      const users = await User.find({ role: { $ne: 'admin' } });
      const notifications = await Promise.all(users.map(u => 
        createNotification(u._id, message, type, null, actionUrl)
      ));
      return res.json({ success: true, message: `Broadcast sent to ${notifications.length} neural links.` });
    }

    await createNotification(userId, message, type, null, actionUrl);
    res.json({ success: true, message: 'Intelligence notification dispatched.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};