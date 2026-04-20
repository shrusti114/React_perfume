const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

const generateSalesReport = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenueResult = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;
    
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    
    // Detailed data for export
    const orders = await Order.find().populate('userId', 'name email').sort({ created_at: -1 }).limit(100);
    const topProducts = await Product.find().sort({ rating: -1 }).limit(10);
    
    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        totalUsers,
        totalProducts,
        orders,
        topProducts
      },
      message: 'Report generated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserReport = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('name email status created_at');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductReport = async (req, res) => {
    try {
        const products = await Product.find().populate('sellerId', 'name');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { generateSalesReport, getUserReport, getProductReport };
