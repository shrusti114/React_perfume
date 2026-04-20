const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/velvora_perfume";
    await mongoose.connect(connStr);
    console.log(`MongoDB Connected: ${connStr}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;