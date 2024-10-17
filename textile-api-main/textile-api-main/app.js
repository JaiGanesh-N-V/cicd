// src/app.js

import express from 'express';
import connectDB from './src/config/db.js';
import cors from 'cors';
import { router } from './src/routes/routes.js';
import { logger } from './src/logger/logger.js';
import cron from 'node-cron';
import axios from 'axios';
// import mongoose from 'mongoose';

const app = express();

// Middleware setup
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(express.json({ limit: '1mb' }));
cron.schedule('0 * * * *', () => {});

// CORS setup to allow all origins
app.use(cors());

// Handle preflight requests
app.options('*', cors());

// Add headers to all responses
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Or specify a particular origin
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use(express.static('public'));
app.use('/src/assets', express.static('src/assets'));

// Routes setup
app.use('/', router);
app.get('*', (req, res) => {
  res.send('Welcome to Ashok Textile');
});

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
});
