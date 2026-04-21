const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Counter = require('./models/Counter');
const Order = require('./models/Order');
const Cart = require('./models/Cart');
const Report = require('./models/Report');
const Feedback = require('./models/Feedback');
const Payment = require('./models/Payment');
const Notification = require('./models/Notification');

dotenv.config();

const perfumeImages = [
  'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600',
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600',
  'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600',
  'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=600',
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=600',
  'https://images.unsplash.com/photo-1619994121345-b61cd610c5a6?q=80&w=600',
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=600',
  'https://images.unsplash.com/photo-1590156206657-aec7b3d87a57?q=80&w=600',
  'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=600',
  'https://images.unsplash.com/photo-1528740096961-3798add15914?q=80&w=600',
  'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=600',
  'https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=600',
  'https://images.unsplash.com/photo-1616093875201-279f12cc42c2?q=80&w=600',
  'https://images.unsplash.com/photo-1606741965429-88247b729837?q=80&w=600',
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/perfume');
    console.log('MongoDB connected for seeding...');

    await mongoose.connection.db.dropDatabase();
    console.log('Database dropped.');

    const salt = await bcrypt.genSalt(10);
    const pw = async (p) => await bcrypt.hash(p, salt);

    // Counters
    await Counter.insertMany([
      { _id: 'userId', seq: 10 },
      { _id: 'categoryId', seq: 6 },
      { _id: 'productId', seq: 50 },
      { _id: 'orderId', seq: 10 },
      { _id: 'cartId', seq: 10 },
      { _id: 'reportId', seq: 6 },
      { _id: 'feedbackId', seq: 10 },
      { _id: 'paymentId', seq: 10 },
    ]);

    // Users
    const users = await User.insertMany([
      { _id: 'A001', name: 'Eleanor Velvora', email: 'admin@gmail.com', password: await pw('admin@123'), role: 'admin', isVerified: true, isEmailVerified: true },
      { _id: 'S001', name: 'Chanel Boutique', email: 'chanel@velvora.com', password: await pw('seller@123'), role: 'seller', shopName: 'Chanel Official', isVerified: true, isEmailVerified: true },
      { _id: 'S002', name: 'Tom Ford Studio', email: 'tomford@velvora.com', password: await pw('seller@123'), role: 'seller', shopName: 'Tom Ford Atelier', isVerified: true, isEmailVerified: true },
      { _id: 'S003', name: 'Dior Perfumery', email: 'dior@velvora.com', password: await pw('seller@123'), role: 'seller', shopName: 'Dior Maison', isVerified: true, isEmailVerified: true },
      { _id: 'U001', name: 'Sophia', email: 'sophia@gmail.com', password: await pw('user@123'), role: 'user', isVerified: true, isEmailVerified: true },
      { _id: 'U002', name: 'James', email: 'james@gmail.com', password: await pw('user@123'), role: 'user', isVerified: true, isEmailVerified: true },
      { _id: 'U003', name: 'Priya', email: 'priya@gmail.com', password: await pw('user@123'), role: 'user', isVerified: true, isEmailVerified: true },
    ]);
    console.log('7 Users seeded (1 admin, 3 sellers, 3 users).');

    // Categories
    const categories = await Category.insertMany([
      { _id: 'C001', category_name: 'Floral', description: 'Romantic rose, jasmine & peony fragrances' },
      { _id: 'C002', category_name: 'Woody', description: 'Cedar, sandalwood & vetiver compositions' },
      { _id: 'C003', category_name: 'Fresh', description: 'Citrus, aquatic & green note perfumes' },
      { _id: 'C004', category_name: 'Oriental', description: 'Amber, vanilla & warm spice blends' },
      { _id: 'C005', category_name: 'Luxury Collection', description: 'The finest niche fragrances' },
    ]);
    console.log('5 Categories seeded.');

   
    const perfumes = [
      { _id: 'P001', name: 'N°5 Eau de Parfum', brand: 'Chanel', price: 185, description: 'The iconic aldehyde floral with May rose and jasmine. The most famous perfume in the world.', family: 'Floral', gender: 'For Women', rating: 5, badge: 'Best Seller', volume: '100ml', notes: { top: ['Aldehydes', 'Neroli'], heart: ['Rose', 'Jasmine'], base: ['Sandalwood', 'Vanilla'] }, categoryId: 'C001', sellerId: 'S001', stock: 100, image: perfumeImages[1] },
      { _id: 'P002', name: 'Bleu de Chanel', brand: 'Chanel', price: 150, description: 'A woody aromatic fragrance for the free-spirited man. Fresh cedar and sandalwood.', family: 'Woody', gender: 'For Men', rating: 4.8, badge: 'Top Rated', volume: '100ml', notes: { top: ['Citrus', 'Mint'], heart: ['Ginger', 'Jasmine'], base: ['Cedar', 'Sandalwood'] }, categoryId: 'C002', sellerId: 'S001', stock: 80, image: perfumeImages[8] },
      { _id: 'P003', name: 'Coco Mademoiselle', brand: 'Chanel', price: 165, description: 'Fresh oriental with sparkling orange and a soft white musk dry-down.', family: 'Oriental', gender: 'For Women', rating: 4.9, volume: '100ml', notes: { top: ['Orange', 'Bergamot'], heart: ['Rose', 'Jasmine'], base: ['Patchouli', 'Vanilla'] }, categoryId: 'C004', sellerId: 'S001', stock: 60, image: perfumeImages[5] },
      { _id: 'P004', name: 'Chance Eau Tendre', brand: 'Chanel', price: 140, description: 'A round floral fragrance with jasmine and white musk.', family: 'Floral', gender: 'For Women', rating: 4.7, volume: '50ml', notes: { top: ['Grapefruit', 'Quince'], heart: ['Jasmine', 'Hyacinth'], base: ['Musk', 'Virginia Cedar'] }, categoryId: 'C001', sellerId: 'S001', stock: 45, image: perfumeImages[11] },
      { _id: 'P005', name: 'Oud Wood', brand: 'Tom Ford', price: 350, description: 'Rare oud wood, sandalwood and vetiver create a smoky, exotic masterpiece.', family: 'Woody', gender: 'Unisex', rating: 4.9, badge: 'Editor\'s Pick', volume: '50ml', notes: { top: ['Rosewood', 'Cardamom'], heart: ['Oud', 'Sandalwood'], base: ['Vetiver', 'Tonka Bean'] }, categoryId: 'C002', sellerId: 'S002', stock: 25, image: perfumeImages[0] },
      { _id: 'P006', name: 'Black Orchid', brand: 'Tom Ford', price: 180, description: 'Luxuriously dark, sensual black orchid with spicy notes and patchouli.', family: 'Oriental', gender: 'Unisex', rating: 4.8, volume: '100ml', notes: { top: ['Truffle', 'Ylang-Ylang'], heart: ['Black Orchid', 'Lotus'], base: ['Patchouli', 'Vanilla'] }, categoryId: 'C004', sellerId: 'S002', stock: 40, image: perfumeImages[6] },
      { _id: 'P007', name: 'Lost Cherry', brand: 'Tom Ford', price: 395, description: 'Black cherry and bitter almond with Turkish rose and jasmine.', family: 'Luxury Collection', gender: 'Unisex', rating: 5, badge: 'Limited Edition', volume: '50ml', notes: { top: ['Cherry', 'Almond'], heart: ['Turkish Rose', 'Jasmine'], base: ['Sandalwood', 'Peru Balsam'] }, categoryId: 'C005', sellerId: 'S002', stock: 15, image: perfumeImages[4] },
      { _id: 'P008', name: 'Tobacco Vanille', brand: 'Tom Ford', price: 280, description: 'Opulent tobacco leaf with warm spices and sweet vanilla.', family: 'Oriental', gender: 'Unisex', rating: 4.9, badge: 'Fan Favourite', volume: '50ml', notes: { top: ['Tobacco Leaf', 'Saffron'], heart: ['Vanilla', 'Cacao'], base: ['Dried Fruits', 'Wood Sap'] }, categoryId: 'C004', sellerId: 'S002', stock: 30, image: perfumeImages[3] },
      { _id: 'P009', name: 'Neroli Portofino', brand: 'Tom Ford', price: 310, description: 'Italian Riviera freshness with Tunisian neroli and bergamot.', family: 'Fresh', gender: 'Unisex', rating: 4.7, volume: '50ml', notes: { top: ['Bergamot', 'Neroli'], heart: ['African Orange Flower'], base: ['Amber', 'Angelica'] }, categoryId: 'C003', sellerId: 'S002', stock: 20, image: perfumeImages[2] },
      { _id: 'P010', name: 'J\'adore', brand: 'Dior', price: 155, description: 'A modern floral bouquet that captures the essence of femininity.', family: 'Floral', gender: 'For Women', rating: 4.9, badge: 'Best Seller', volume: '100ml', notes: { top: ['Pear', 'Melon'], heart: ['Rose', 'Jasmine'], base: ['Vanilla', 'Musk'] }, categoryId: 'C001', sellerId: 'S003', stock: 90, image: perfumeImages[9] },
      { _id: 'P011', name: 'Sauvage Eau de Parfum', brand: 'Dior', price: 145, description: 'Raw, noble and magnetic. Fresh Calabrian bergamot with ambroxan warmth.', family: 'Woody', gender: 'For Men', rating: 5, badge: 'Best Seller', volume: '100ml', notes: { top: ['Bergamot', 'Pepper'], heart: ['Sichuan Pepper', 'Lavender'], base: ['Ambroxan', 'Cedar'] }, categoryId: 'C002', sellerId: 'S003', stock: 110, image: perfumeImages[12] },
      { _id: 'P012', name: 'Miss Dior', brand: 'Dior', price: 135, description: 'A couture floral with centifolia rose and fresh peony.', family: 'Floral', gender: 'For Women', rating: 4.8, volume: '100ml', notes: { top: ['Mandarin', 'Peony'], heart: ['Rose', 'Lily of the Valley'], base: ['Patchouli', 'Musk'] }, categoryId: 'C001', sellerId: 'S003', stock: 75, image: perfumeImages[14] },
      { _id: 'P013', name: 'Oud Ispahan', brand: 'Dior', price: 380, description: 'A precious oud from Laos with Damask rose in a deep, opulent blend.', family: 'Luxury Collection', gender: 'Unisex', rating: 4.9, badge: 'Exclusive', volume: '125ml', notes: { top: ['Labdanum'], heart: ['Damask Rose', 'Oud'], base: ['Sandalwood', 'Incense'] }, categoryId: 'C005', sellerId: 'S003', stock: 10, image: perfumeImages[13] },
      { _id: 'P014', name: 'Aventus', brand: 'Creed', price: 445, description: 'A bold masculine blend of pineapple, birch and ambergris. The king of perfumes.', family: 'Fresh', gender: 'For Men', rating: 5, badge: 'Award Winner', volume: '100ml', notes: { top: ['Pineapple', 'Apple'], heart: ['Birch', 'Jasmine'], base: ['Ambergris', 'Musk'] }, categoryId: 'C003', sellerId: 'S001', stock: 35, image: perfumeImages[11] },
      { _id: 'P015', name: 'Santal 33', brand: 'Le Labo', price: 290, description: 'The cult favourite. Cardamom, iris and violet meet Australian sandalwood.', family: 'Woody', gender: 'Unisex', rating: 4.8, badge: 'Trending', volume: '50ml', notes: { top: ['Cardamom', 'Violet'], heart: ['Iris', 'Ambrox'], base: ['Sandalwood', 'Cedar', 'Musk'] }, categoryId: 'C002', sellerId: 'S002', stock: 28, image: perfumeImages[7] },
      { _id: 'P016', name: 'Rose 31', brand: 'Le Labo', price: 275, description: 'Not your grandmother\'s rose — cumin, cedar and guaiac wood give it edge.', family: 'Floral', gender: 'Unisex', rating: 4.7, volume: '50ml', notes: { top: ['Cumin', 'Rose'], heart: ['Cedar', 'Guaiac Wood'], base: ['Cistus', 'Musk'] }, categoryId: 'C001', sellerId: 'S002', stock: 22, image: perfumeImages[14] },
      { _id: 'P017', name: 'Gypsy Water', brand: 'Byredo', price: 260, description: 'A romanticized nomadic life with pine needles, sandalwood and vanilla.', family: 'Woody', gender: 'Unisex', rating: 4.6, volume: '50ml', notes: { top: ['Bergamot', 'Pepper'], heart: ['Pine Needles', 'Incense'], base: ['Sandalwood', 'Vanilla'] }, categoryId: 'C002', sellerId: 'S003', stock: 18, image: perfumeImages[13] },
      { _id: 'P018', name: 'Mojave Ghost', brand: 'Byredo', price: 255, description: 'A woody floral that captures the beauty of the Mojave desert.', family: 'Fresh', gender: 'Unisex', rating: 4.7, volume: '100ml', notes: { top: ['Ambrette', 'Sapodilla'], heart: ['Violet', 'Sandalwood'], base: ['Magnolia', 'Crisp Amber'] }, categoryId: 'C003', sellerId: 'S003', stock: 32, image: perfumeImages[10] },
      { _id: 'P019', name: 'La Vie Est Belle', brand: 'Lancôme', price: 120, description: 'A delicious iris, patchouli and praline gourmand that celebrates happiness.', family: 'Oriental', gender: 'For Women', rating: 4.8, badge: 'Staff Pick', volume: '75ml', notes: { top: ['Blackcurrant'], heart: ['Iris', 'Jasmine'], base: ['Patchouli', 'Praline'] }, categoryId: 'C004', sellerId: 'S001', stock: 65, image: perfumeImages[8] },
      { _id: 'P020', name: 'Light Blue', brand: 'Dolce & Gabbana', price: 98, description: 'The spirit of a Mediterranean summer. Crisp apple, bluebell and cedar.', family: 'Fresh', gender: 'For Women', rating: 4.5, volume: '100ml', notes: { top: ['Apple', 'Cedar'], heart: ['Bluebell', 'Bamboo'], base: ['Cedar', 'Musk'] }, categoryId: 'C003', sellerId: 'S001', stock: 88, image: perfumeImages[5] },
      { _id: 'P021', name: 'Baccarat Rouge 540', brand: 'Maison Francis Kurkdjian', price: 325, description: 'Luminous saffron and amberwood in a crystal-clear composition.', family: 'Luxury Collection', gender: 'Unisex', rating: 5, badge: 'Best Seller', volume: '70ml', notes: { top: ['Saffron', 'Jasmine'], heart: ['Amberwood', 'Fir Resin'], base: ['Cedar', 'Musk'] }, categoryId: 'C005', sellerId: 'S002', stock: 12, image: perfumeImages[4] },
      { _id: 'P022', name: 'Interlude Man', brand: 'Amouage', price: 310, description: 'Baroque opulence with frankincense, oud and oregano over leather and amber.', family: 'Oriental', gender: 'For Men', rating: 4.9, badge: 'Exclusive', volume: '100ml', notes: { top: ['Oregano', 'Bergamot'], heart: ['Frankincense', 'Oud'], base: ['Leather', 'Amber'] }, categoryId: 'C004', sellerId: 'S003', stock: 14, image: perfumeImages[0] },
      { _id: 'P023', name: 'Reflection Man', brand: 'Amouage', price: 295, description: 'Fresh jasmine and neroli over sandalwood. Pure class and refinement.', family: 'Fresh', gender: 'For Men', rating: 4.8, volume: '100ml', notes: { top: ['Rosemary', 'Neroli'], heart: ['Jasmine', 'Orris'], base: ['Sandalwood', 'Cedar'] }, categoryId: 'C003', sellerId: 'S003', stock: 20, image: perfumeImages[8] },
      { _id: 'P024', name: 'Delina', brand: 'Parfums de Marly', price: 315, description: 'A regal blend of Turkish rose, lychee and peony with cashmeran.', family: 'Floral', gender: 'For Women', rating: 4.9, badge: 'Trending', volume: '75ml', notes: { top: ['Lychee', 'Rhubarb'], heart: ['Turkish Rose', 'Peony'], base: ['Cashmeran', 'Vanilla'] }, categoryId: 'C001', sellerId: 'S001', stock: 26, image: perfumeImages[1] },
      { _id: 'P025', name: 'Layton', brand: 'Parfums de Marly', price: 305, description: 'Apple and lavender opening into vanilla and sandalwood. Gentleman\'s choice.', family: 'Woody', gender: 'For Men', rating: 4.9, badge: 'Fan Favourite', volume: '125ml', notes: { top: ['Apple', 'Lavender'], heart: ['Geranium', 'Jasmine'], base: ['Vanilla', 'Sandalwood'] }, categoryId: 'C002', sellerId: 'S001', stock: 30, image: perfumeImages[3] },
      { _id: 'P026', name: 'Acqua di Gio Profumo', brand: 'Armani', price: 125, description: 'Marine aquatic fragrance with incense, amber and patchouli.', family: 'Fresh', gender: 'For Men', rating: 4.7, volume: '75ml', notes: { top: ['Bergamot', 'Aquatic Notes'], heart: ['Geranium', 'Rosemary'], base: ['Patchouli', 'Amber'] }, categoryId: 'C003', sellerId: 'S003', stock: 55, image: perfumeImages[2] },
      { _id: 'P027', name: 'Flowerbomb', brand: 'Viktor & Rolf', price: 160, description: 'An explosion of fresh and sweet flowers. Cattleya orchid, rose and jasmine.', family: 'Floral', gender: 'For Women', rating: 4.7, volume: '100ml', notes: { top: ['Tea', 'Bergamot'], heart: ['Orchid', 'Rose', 'Jasmine'], base: ['Patchouli', 'Musk'] }, categoryId: 'C001', sellerId: 'S002', stock: 42, image: perfumeImages[9] },
      { _id: 'P028', name: 'Eau des Merveilles', brand: 'Hermès', price: 130, description: 'A woody amber with a touch of orange zest and elemi. Effortless elegance.', family: 'Woody', gender: 'For Women', rating: 4.6, volume: '50ml', notes: { top: ['Orange', 'Elemi'], heart: ['Pepper', 'Amber'], base: ['Oak', 'Cedar'] }, categoryId: 'C002', sellerId: 'S003', stock: 33, image: perfumeImages[7] },
      { _id: 'P029', name: 'Philosykos', brand: 'Diptyque', price: 175, description: 'The poetry of a fig tree — green fig leaf, white wood and coconut milk.', family: 'Fresh', gender: 'Unisex', rating: 4.5, volume: '75ml', notes: { top: ['Fig Leaf'], heart: ['Fig Tree', 'Coconut Milk'], base: ['White Wood', 'Cedar'] }, categoryId: 'C003', sellerId: 'S001', stock: 19, image: perfumeImages[4] },
      { _id: 'P030', name: 'Velvet Rose & Oud', brand: 'Jo Malone', price: 195, description: 'Damask rose meets smoky oud and clove. Dark, opulent and intoxicating.', family: 'Luxury Collection', gender: 'Unisex', rating: 4.8, badge: 'New Arrival', volume: '100ml', notes: { top: ['Clove'], heart: ['Damask Rose', 'Oud'], base: ['Praline', 'Smoky Wood'] }, categoryId: 'C005', sellerId: 'S002', stock: 16, image: perfumeImages[6] },
    ];

    await Product.insertMany(perfumes);
    console.log(`${perfumes.length} Perfumes seeded.`);

    // Orders
    await Order.insertMany([
      { _id: 'O001', userId: 'U001', products: [{ productId: 'P001', quantity: 1 }, { productId: 'P010', quantity: 1 }], totalAmount: 340, status: 'Delivered' },
      { _id: 'O002', userId: 'U001', products: [{ productId: 'P005', quantity: 1 }], totalAmount: 350, status: 'Shipped' },
      { _id: 'O003', userId: 'U002', products: [{ productId: 'P011', quantity: 2 }], totalAmount: 290, status: 'Processing' },
      { _id: 'O004', userId: 'U002', products: [{ productId: 'P021', quantity: 1 }, { productId: 'P007', quantity: 1 }], totalAmount: 720, status: 'Delivered' },
      { _id: 'O005', userId: 'U003', products: [{ productId: 'P014', quantity: 1 }], totalAmount: 445, status: 'Processing' },
    ]);
    console.log('5 Orders seeded.');

    // Carts
    await Cart.insertMany([
      { _id: 'CA001', userId: 'A001', items: [] },
      { _id: 'CA002', userId: 'S001', items: [] },
      { _id: 'CA003', userId: 'U001', items: [{ productId: 'P015', quantity: 1 }] },
      { _id: 'CA004', userId: 'U002', items: [{ productId: 'P003', quantity: 1 }, { productId: 'P024', quantity: 1 }] },
      { _id: 'CA005', userId: 'U003', items: [{ productId: 'P020', quantity: 2 }] },
    ]);
    console.log('5 Carts seeded.');

    // Reports
    await Report.insertMany([
      { _id: 'R001', type: 'Sales', data: [{ month: 'Jan', total: 42000 }, { month: 'Feb', total: 55000 }] },
      { _id: 'R002', type: 'User', data: [{ role: 'user', newCount: 120 }, { role: 'seller', newCount: 8 }] },
      { _id: 'R003', type: 'Sales', data: [{ month: 'Mar', total: 68000 }] },
    ]);
    console.log('3 Reports seeded.');

    // Feedbacks
    await Feedback.insertMany([
      { _id: 'F001', user_id: 'U001', product_id: 'P001', rating: 5, comment: 'Simply divine. The scent lasts all day.' },
      { _id: 'F002', user_id: 'U002', product_id: 'P011', rating: 4, comment: 'Very fresh and manly. My wife loves it.' },
      { _id: 'F003', user_id: 'U003', product_id: 'P005', rating: 5, comment: 'The oud notes are incredible. Highly recommend.' },
    ]);
    console.log('3 Feedbacks seeded.');

    // Payments
    await Payment.insertMany([
      { _id: 'PA001', order_id: 'O001', payment_mode: 'Card', amount: 340, transaction_id: 'tx_987654321' },
      { _id: 'PA002', order_id: 'O002', payment_mode: 'PayPal', amount: 350, transaction_id: 'tx_123456789' },
      { _id: 'PA004', order_id: 'O004', payment_mode: 'Stripe', amount: 720, transaction_id: 'tx_555666777' },
    ]);
    console.log('3 Payments seeded.');

    // Notifications
    await Notification.insertMany([
      { userId: 'A001', message: 'System scan complete. All vaults secure.', type: 'success' },
      { userId: 'S001', message: 'New order received for N°5 Eau de Parfum.', type: 'info', actionUrl: '/seller/orders' },
      { userId: 'U001', message: 'Your order O002 has been shipped!', type: 'success', actionUrl: '/orders' },
    ]);
    console.log('3 Notifications seeded.');

    console.log('\n✅ Velvora database seeded successfully!');
    console.log('──────────────────────────────────');
    console.log('Admin:  admin@gmail.com / admin@123');
    console.log('Seller: chanel@velvora.com / seller@123');
    console.log('Seller: tomford@velvora.com / seller@123');
    console.log('Seller: dior@velvora.com / seller@123');
    console.log('User:   sophia@gmail.com / user@123');
    console.log('User:   james@gmail.com / user@123');
    console.log('User:   priya@gmail.com / user@123');
    console.log('──────────────────────────────────');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
