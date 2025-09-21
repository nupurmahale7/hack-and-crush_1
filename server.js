'use strict';

// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const consumptionRoutes = require('./routes/consumption');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'smart-water-backend', time: new Date().toISOString() });
});

// API routes
app.use('/api/consumption', consumptionRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('ERROR: MONGO_URI is not set. Create a .env file based on .env.example');
} else {
  mongoose
    .connect(MONGO_URI, {
      // options placeholder (Mongoose 8 uses modern defaults)
    })
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
    });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
