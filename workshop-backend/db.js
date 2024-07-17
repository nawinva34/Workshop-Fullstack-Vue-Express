const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

module.exports = connectDB;
