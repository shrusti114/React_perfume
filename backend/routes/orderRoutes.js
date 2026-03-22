const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus, getSellerOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
  .post(protect, createOrder)
  .get(protect, authorize('admin'), getAllOrders);

router.get('/seller', protect, authorize('seller'), getSellerOrders);

router.route('/myorders')
  .get(protect, getUserOrders);

router.route('/:id/status')
  .put(protect, authorize('admin', 'seller'), updateOrderStatus);

module.exports = router;
