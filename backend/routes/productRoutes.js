const express = require('express');
const router = express.Router();
const { getProducts, getSellerProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
  .get(getProducts)
  .post(protect, authorize('admin', 'seller'), createProduct);

router.get('/seller', protect, authorize('seller'), getSellerProducts);

router.route('/:id')
  .put(protect, authorize('admin', 'seller'), updateProduct)
  .delete(protect, authorize('admin', 'seller'), deleteProduct);

module.exports = router;
