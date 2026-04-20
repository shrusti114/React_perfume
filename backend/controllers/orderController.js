const Order = require('../models/Order');
const { createNotification } = require('./notificationController');
const { sendOrderStatusEmail } = require('../services/emailService');
const jwt = require('jsonwebtoken');

const createOrder = async (req, res) => {
  console.log('[DEBUG] Order Request Body:', JSON.stringify(req.body, null, 2));
  try {
    const { products, totalAmount, guestInfo } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    let userId = null;
    let userEmail = guestInfo?.email;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'velvora_jwt_super_secret_2026';
        const decoded = jwt.verify(token, secret);
        userId = decoded.id;
        const User = require('../models/User');
        const user = await User.findById(userId);
        if (user) userEmail = user.email;
      } catch (err) {
        console.error("[DEBUG] Guest checkout fallback: invalid token or secret mismatch", err.message);
      }
    }

    if (!userId && !guestInfo?.email) {
      return res.status(400).json({ message: 'Authentication or Guest Information is required to place an order.' });
    }

    // Generate Custom Order ID
    const generateId = require('../utils/generateId');
    let orderId;
    try {
      orderId = await generateId('orderId', 'ORD');
    } catch (idErr) {
      console.error('[DEBUG] ID Generation Failed:', idErr);
      orderId = 'ORD-' + Date.now().toString(36).toUpperCase();
    }

    const order = new Order({
      _id: orderId,
      userId: userId || undefined,
      guestInfo: userId ? undefined : guestInfo,
      products,
      totalAmount,
      status: 'Placed',
      statusHistory: [{ status: 'Placed', timestamp: new Date() }],
      paymentMethod: req.body.paymentMethod || 'COD',
      paymentStatus: req.body.paymentStatus || 'Pending',
      transactionId: req.body.transactionId
    });

    console.log('[DEBUG] Saving Order object to MongoDB...');
    const createdOrder = await order.save();
    console.log('[DEBUG] Order saved successfully:', createdOrder._id);

    // Fetch full order for email (populating products)
    const fullOrder = await Order.findById(createdOrder._id).populate('products.productId');

    // Send Email - Wrapped in a silent catch to prevent 403/500 if SMTP fails
    if (userEmail) {
      try {
        console.log(`[DEBUG] Attempting to send confirmation email to ${userEmail}...`);
        await sendOrderStatusEmail(userEmail, fullOrder);
      } catch (mailErr) {
        console.error('[DEBUG] Email sending failed during checkout:', mailErr.message);
      }
    }

    // Trigger notification if user is logged in
    if (userId) {
      try {
        await createNotification(
          userId,
          `Success! Order #${createdOrder._id.slice(-8)} has been placed. Check your email for confirmation.`,
          'success',
          createdOrder._id,
          `/track/${createdOrder._id}`
        );
      } catch (notifErr) {
        console.error('[DEBUG] Notification failed:', notifErr.message);
      }
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('[DEBUG] Critical Order Controller Error:', error);
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      const oldStatus = order.status;
      const newStatus = req.body.status;

      if (newStatus && oldStatus !== newStatus) {
        order.status = newStatus;
        order.statusHistory.push({ status: newStatus, timestamp: new Date() });
      }

      const updatedOrder = await order.save();
      const fullOrder = await Order.findById(updatedOrder._id)
        .populate('userId', 'email name')
        .populate('products.productId');

      // Determine recipient email
      const recipientEmail = fullOrder.userId?.email || fullOrder.guestInfo?.email;

      // Send Email Update for key milestones
      if (recipientEmail && ['Shipped', 'Out for Delivery', 'Delivered'].includes(newStatus)) {
        await sendOrderStatusEmail(recipientEmail, fullOrder);
      }

      // Trigger notification
      if (updatedOrder.userId) {
        let title = 'Deployment Status';
        let type = 'info';
        if (updatedOrder.status === 'Delivered') {
          title = 'Mission Completed';
          type = 'success';
        }

        await createNotification(
          updatedOrder.userId,
          `${title}: Your order #${updatedOrder._id.slice(-8)} is now ${updatedOrder.status}.`,
          type,
          updatedOrder._id,
          `/track/${updatedOrder._id}`
        );
      }

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getSellerOrders = async (req, res) => {
//   try {
//     const Product = require('../models/Product');
//     const sellerProducts = await Product.find({ sellerId: req.user._id }).select('_id');
//     const productIds = sellerProducts.map(p => p._id);

//     const orders = await Order.find({ 'products.productId': { $in: productIds } })
//       .populate('userId', 'name email')
//       .populate('products.productId');

//     // Filter out products in each order that don't belong to this seller
//     const filteredOrders = orders.map(order => {
//       const orderObj = order.toObject();
//       orderObj.products = orderObj.products.filter(p => 
//         p.productId && p.productId.sellerId.toString() === req.user._id.toString()
//       );
//       return orderObj;
//     });

//     res.json(filteredOrders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('products.productId');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const trackOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .select('status createdAt updatedAt _id totalAmount guestInfo paymentStatus statusHistory')
      .populate('products.productId', 'name image price brand');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('userId', 'name email').populate('products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSellerOrders = async (req, res) => {
  try {
    const Product = require('../models/Product');
    const sellerProducts = await Product.find({ sellerId: req.user._id }).select('_id');
    const productIds = sellerProducts.map(p => p._id);

    const orders = await Order.find({ 'products.productId': { $in: productIds } })
      .populate('userId', 'name email')
      .populate('products.productId');

    const filteredOrders = orders.map(order => {
      const orderObj = order.toObject();
      orderObj.products = orderObj.products.filter(p =>
        p.productId && p.productId.sellerId.toString() === req.user._id.toString()
      );
      return orderObj;
    });

    res.json(filteredOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderStatus, getSellerOrders, getOrderById, trackOrder };
