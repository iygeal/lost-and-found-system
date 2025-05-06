// Load environment variables from .env file
require('dotenv').config();

// Import ExpressJS framework
const express = require('express');

// Import Mongoose module which provides an interface to MongoDB
const mongoose = require('mongoose');

// Import Mongoose model for the items collection in the lost and found system database
const Item = require('./models/itemModel');

// Create an ExpressJS application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Get MongoDB URI and port number from environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 7000;

// Now connect to MongoDB database and start server only if connection is successful
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(
      'MongoDB successfully connected to the lost and found system database'
    );
    app.listen(PORT, () => {
      console.log(`Express Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
