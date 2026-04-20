const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus, getSellerOrders, getOrderById, trackOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/', createOrder);
router.get('/', protect, authorize('admin'), getAllOrders);

router.get('/seller', protect, authorize('seller'), getSellerOrders);

router.get('/track/:id', trackOrder); // Publicly accessible tracking

router.route('/myorders')
  .get(protect, getUserOrders);

router.route('/:id')
  .get(protect, getOrderById);

router.route('/:id/status')
  .put(protect, authorize('admin', 'seller'), updateOrderStatus);

module.exports = router;
