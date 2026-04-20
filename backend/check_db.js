const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/perfume')
  .then(async () => {
    console.log("Connected to MongoDB.");
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    
    for (const c of collections) {
      const count = await mongoose.connection.db.collection(c.name).countDocuments();
      console.log(`Collection ${c.name} has ${count} documents.`);
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
