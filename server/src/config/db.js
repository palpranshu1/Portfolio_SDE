
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI is missing in environment variables');
    }

    if (
      !mongoURI.startsWith('mongodb://') &&
      !mongoURI.startsWith('mongodb+srv://')
    ) {
      throw new Error('Invalid MongoDB connection string format');
    }

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(
      `[Database] MongoDB Connected: ${conn.connection.host}`
    );

    return conn;
  } catch (error) {
    console.error(
      `[Database Error] ${error.message}`
    );
    throw error;
  }
};

module.exports = connectDB;
