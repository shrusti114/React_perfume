const express = require('express');
const router = express.Router();
const { generateSalesReport } = require('../controllers/reportController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/sales', protect, admin, generateSalesReport);

module.exports = router;
