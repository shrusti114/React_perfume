const express = require('express');
const router = express.Router();
const { getSellerStats } = require('../controllers/sellerController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/stats', protect, authorize('seller', 'admin'), getSellerStats);

module.exports = router;
