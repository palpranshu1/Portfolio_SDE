
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

    console.log('[Database] Connecting to MongoDB Atlas...');

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000
    });

    console.log(
      `[Database] Connected successfully: ${conn.connection.host}`
    );

    return conn;

  } catch (error) {
    console.error('[Database Error]', error.name);
    console.error('Message:', error.message);

    if (error.reason?.servers) {
      for (const [address, server] of error.reason.servers) {
        console.error('Server:', address);
        console.error('Server Type:', server.type);
        console.error(
          'Server Error:',
          server.error?.message || 'No detailed server error'
        );
      }
    }

    throw error;
  }
};

module.exports = connectDB;
