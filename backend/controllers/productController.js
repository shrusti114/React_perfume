const Product = require('../models/Product');
const { createNotification } = require('./notificationController');

const getProducts = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice, sort } = req.query;
    
    // Build query object
    const query = {};
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }
    if (category) {
      query.category = category;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Build sort object
    let sortObj = {};
    if (sort === 'price_asc') sortObj.price = 1;
    else if (sort === 'price_desc') sortObj.price = -1;
    else if (sort === 'newest') sortObj.createdAt = -1;
    else sortObj.createdAt = -1; // default

    const products = await Product.find(query)
      .populate('sellerId', 'name email')
      .populate('categoryId', 'category_name')
      .sort(sortObj);
      
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('sellerId', 'name email shopName');
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, brand, price, description, image, family, gender, volume, notes, stock, badge, categoryId, discount_price } = req.body;
    const generateId = require('../utils/generateId');
    const productId = await generateId('productId', 'P');
    const product = new Product({
      _id: productId,
      name,
      brand: brand || 'Velvora',
      price,
      description,
      image: image || 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600',
      family: family || 'Floral',
      gender: gender || 'Unisex',
      volume: volume || '100ml',
      notes: notes || { top: [], heart: [], base: [] },
      stock: stock || 10,
      badge: badge || undefined,
      categoryId: categoryId || undefined,
      discount_price: discount_price || undefined,
      sellerId: req.user._id,
      status: 'Active',
    });
    const createdProduct = await product.save();
    
    // Trigger notification
    await createNotification(
      req.user._id, 
      `Success! "${createdProduct.name}" has been added to the Velvora collection.`,
      'success',
      createdProduct._id,
      `/shop/${createdProduct._id}`
    );

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      if (product.sellerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'User not authorized to update this product' });
      }
      const fields = ['name', 'brand', 'price', 'description', 'image', 'family', 'gender', 'volume', 'notes', 'stock', 'badge', 'categoryId', 'discount_price', 'status'];
      fields.forEach(field => {
        if (req.body[field] !== undefined) product[field] = req.body[field];
      });

      const updatedProduct = await product.save();
      
      // Trigger notification
      await createNotification(
        req.user._id, 
        `Intelligence Updated: Product "${updatedProduct.name}" details have been synchronized.`,
        'info',
        updatedProduct._id,
        `/shop/${updatedProduct._id}`
      );

      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      if (product.sellerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'User not authorized to delete this product' });
      }
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, getSellerProducts, createProduct, updateProduct, deleteProduct };
