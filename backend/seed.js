const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Models
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Counter = require('./models/Counter');
const Order = require('./models/Order');
const Cart = require('./models/Cart');
const Report = require('./models/Report');

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/perfume');
    console.log('MongoDB connected for mass seeding...');

    // Drop database to clear old state
    await mongoose.connection.db.dropDatabase();
    console.log('Database dropped.');

    const salt = await bcrypt.genSalt(10);
    const passGen = async (pw) => await bcrypt.hash(pw, salt);

    const pwBase = await passGen('password123');
    const pwShree = await passGen('shree114');
    const pwAdmin = await passGen('admin@123');

    // 1. Seed Counters
    await Counter.insertMany([
      { _id: 'userId', seq: 6 },
      { _id: 'categoryId', seq: 6 },
      { _id: 'productId', seq: 6 },
      { _id: 'orderId', seq: 6 },
      { _id: 'cartId', seq: 6 },
      { _id: 'reportId', seq: 6 },
    ]);

    // 2. Users (5 records - 1 Admin, 2 Sellers, 2 Users)
    const users = await User.insertMany([
      { _id: 'A001', name: 'Admin Dashboard', email: 'adminP@gmail.com', password: pwAdmin, role: 'admin', isVerified: true },
      { _id: 'S001', name: 'Tanya', email: 'tanya@gmail.com', password: pwBase, role: 'seller', shopName: 'Tanya Fragrances', isVerified: true },
      { _id: 'S002', name: 'Liam Scents', email: 'liam@domain.com', password: pwBase, role: 'seller', shopName: 'Liam Atelier', isVerified: false },
      { _id: 'U001', name: 'Shrusti', email: 'shrusti@gmail.com', password: pwShree, role: 'user', isVerified: true, phone: '555-0100' },
      { _id: 'U002', name: 'Elena', email: 'elena@gmail.com', password: pwBase, role: 'user', isVerified: true, phone: '555-0101' }
    ]);
    console.log('5 Users seeded.');

    // 3. Categories (5 records)
    const categories = await Category.insertMany([
      { _id: 'C001', name: 'Floral', description: 'Bouquet of blooming flowers.' },
      { _id: 'C002', name: 'Woody', description: 'Deep, earthy forests and amber.' },
      { _id: 'C003', name: 'Citrus', description: 'Bright, zesty, and refreshing.' },
      { _id: 'C004', name: 'Oriental', description: 'Spicy, warm, and exotic.' },
      { _id: 'C005', name: 'Fresh', description: 'Clean aquatic and marine notes.' }
    ]);
    console.log('5 Categories seeded.');

    // 4. Products (5 records) - no external images
    const products = await Product.insertMany([
      { _id: 'P001', name: 'Midnight Rose', brand: 'Westion', price: 185, description: 'Deep red roses at midnight.', image: '', categoryId: categories[0]._id, sellerId: users[1]._id, stock: 50 },
      { _id: 'P002', name: 'Velvet Oud', brand: 'Westion', price: 210, description: 'Deep earthy scent mixed with smoky amber.', image: '', categoryId: categories[1]._id, sellerId: users[1]._id, stock: 30 },
      { _id: 'P003', name: 'Amalfi Lemon', brand: 'Amore', price: 95, description: 'Sparkling citrus from the Italian coast.', image: '', categoryId: categories[2]._id, sellerId: users[2]._id, stock: 120 },
      { _id: 'P004', name: 'Spicy Noir', brand: 'Noir Scents', price: 150, description: 'Intense oriental spices and dark vanilla.', image: '', categoryId: categories[3]._id, sellerId: users[1]._id, stock: 15 },
      { _id: 'P005', name: 'Ocean Mist', brand: 'Aqua', price: 120, description: 'Crisp salt air and fresh sea breeze.', image: '', categoryId: categories[4]._id, sellerId: users[2]._id, stock: 200 }
    ]);
    console.log('5 Products seeded.');

    // 5. Orders (5 records)
    const orders = await Order.insertMany([
      { _id: 'O001', userId: users[3]._id, products: [{ productId: products[0]._id, quantity: 2 }], totalAmount: 370, status: 'Delivered' },
      { _id: 'O002', userId: users[3]._id, products: [{ productId: products[1]._id, quantity: 1 }], totalAmount: 210, status: 'Shipped' },
      { _id: 'O003', userId: users[4]._id, products: [{ productId: products[2]._id, quantity: 1 }, { productId: products[4]._id, quantity: 1 }], totalAmount: 215, status: 'Processing' },
      { _id: 'O004', userId: users[4]._id, products: [{ productId: products[3]._id, quantity: 3 }], totalAmount: 450, status: 'Pending' },
      { _id: 'O005', userId: users[3]._id, products: [{ productId: products[0]._id, quantity: 1 }, { productId: products[1]._id, quantity: 1 }], totalAmount: 395, status: 'Cancelled' }
    ]);
    console.log('5 Orders seeded.');

    // 6. Carts (5 records)
    // Note: Carts are unique per user. We have 5 users, so we create 5 carts.
    const carts = await Cart.insertMany([
      { _id: 'CA001', userId: users[0]._id, items: [{ productId: products[0]._id, quantity: 1 }] },
      { _id: 'CA002', userId: users[1]._id, items: [{ productId: products[1]._id, quantity: 2 }] },
      { _id: 'CA003', userId: users[2]._id, items: [] }, // Empty cart
      { _id: 'CA004', userId: users[3]._id, items: [{ productId: products[3]._id, quantity: 1 }, { productId: products[4]._id, quantity: 5 }] },
      { _id: 'CA005', userId: users[4]._id, items: [{ productId: products[2]._id, quantity: 3 }] }
    ]);
    console.log('5 Carts seeded.');

    // 7. Reports (5 records)
    const reports = await Report.insertMany([
      { _id: 'R001', type: 'Sales', data: [{ month: 'Jan', total: 12000 }, { month: 'Feb', total: 15000 }], createdAt: new Date('2026-03-01T10:00:00') },
      { _id: 'R002', type: 'User', data: [{ role: 'user', newCount: 45 }, { role: 'seller', newCount: 3 }], createdAt: new Date('2026-03-02T10:00:00') },
      { _id: 'R003', type: 'Sales', data: [{ month: 'Mar', total: 22000 }], createdAt: new Date('2026-03-03T10:00:00') },
      { _id: 'R004', type: 'User', data: [{ role: 'user', newCount: 12 }], createdAt: new Date('2026-03-04T10:00:00') },
      { _id: 'R005', type: 'Sales', data: [{ month: 'Apr', total: 34000 }], createdAt: new Date('2026-03-05T10:00:00') }
    ]);
    console.log('5 Reports seeded.');

    console.log('=== Database mass-seeded successfully with 5 records per collection ===');
    process.exit(0);
  } catch (error) {
    console.error('Error with mass seeded data:', error);
    process.exit(1);
  }
};

seedDatabase();
