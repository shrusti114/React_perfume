const mongoose = require('mongoose');

const models = [
  'User',
  'Category',
  'Product',
  'Cart',
  'Order',
  'OrderItem',
  'Payment',
  'Feedback',
  'ForgotPassword'
];

async function test() {
  try {
    for (const model of models) {
      require(`./models/${model}`);
    }
    console.log('✅ All 9 Mongoose schemas compiled successfully!');
    process.exit(0);
  } catch(e) {
    console.error('❌ Schema Error:', e.message);
    process.exit(1);
  }
}
test();
