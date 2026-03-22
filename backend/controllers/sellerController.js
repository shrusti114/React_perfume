const Product = require('../models/Product');
const Order = require('../models/Order');

const getSellerStats = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // Total Products
    const totalProducts = await Product.countDocuments({ sellerId });

    // Find all product IDs for this seller
    const sellerProducts = await Product.find({ sellerId }).select('_id');
    const productIds = sellerProducts.map(p => p._id);

    // Get all orders containing at least one product from this seller
    const orders = await Order.find({ 'products.productId': { $in: productIds } })
      .populate('products.productId');

    let totalRevenue = 0;
    let totalSalesCount = 0;
    let pendingOrdersCount = 0;

    orders.forEach(order => {
      if (order.status === 'Pending' || order.status === 'Processing') {
        pendingOrdersCount++;
      }

      order.products.forEach(item => {
        if (item.productId && item.productId.sellerId.toString() === sellerId.toString()) {
          totalRevenue += (item.productId.price * item.quantity);
          totalSalesCount += item.quantity;
        }
      });
    });

    res.json({
      totalProducts,
      totalRevenue,
      totalSalesCount,
      pendingOrdersCount,
      totalOrders: orders.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSellerStats };
