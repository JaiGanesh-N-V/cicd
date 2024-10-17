import mongoose from 'mongoose';
import { logger } from '../logger/logger.js';

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  try {
    await mongoose.connect(mongoURI, {
      autoCreate: true,
      autoIndex: false,
    });
    logger.info('MongoDB connected successfully');
  } catch (err) {
    logger.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};

export default connectDB;
