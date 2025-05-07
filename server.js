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

// API Routes

// Route to add a new found item
app.post('/api/v1/items', async (request, response) => {
  // Get item details from request body
  const { itemName, description, locationFound, dateFound, claimed } =
    request.body;

  // Check if itemName is provided
  if (!itemName) {
    return response.status(400).json({ error: 'Item name is required' });
  }

  // Create a new item object with the provided details
  const newItem = new Item({
    itemName,
    description,
    locationFound,
    dateFound,
    claimed,
  });

  // Save the item to the database
  await newItem.save();

  // Return a success response with the saved item details
  response.status(201).json({ message: 'Item added successfully', newItem });
});

// Route to view all unclaimed items
app.get('/api/v1/items/unclaimed', async (request, response) => {
  // Find all items in the database where claimed is false
  const unclaimedItems = await Item.find({ claimed: false });

  // Return a success response with the unclaimed items
  response.status(200).json(unclaimedItems);
});

// Route to view one item by ID
app.get('/api/v1/items/:id', async (request, response) => {
  // Get the item's ID from the request parameters
  const { id } = request.params;

  // Find the item in the database by its ID
  const item = await Item.findById(id);

  // If no item is found by the ID, return an error response
  if (!item) {
    return response.status(404).json({ error: 'No item found by that ID' });
  }

  // If that's not the case, it means the item was found
  // Return a success response with the item details
  response.status(200).json(item);
});

// Route to update an item's details or mark it as claimed
app.put('/api/v1/items/:id', async (request, response) => {
  // Get the item's ID from the request parameters
  const { id } = request.params;

  // Data to be sent in the body to update item
  const updateData = request.body;

  // Find the item by the ID and update it
  const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  // If no item is found by the ID, return an error response
  if (!updatedItem) {
    return response.status(404).json({ error: 'No item found by that ID' });
  }

  // If that's not the case, it means the item was found and updated
  // Return a success response with the updated item details
  response.status(200).json({
    message: 'Item updated successfully',
    updatedItem,
  });
});

// Delete an old/irrelevant item from the database
app.delete('/api/v1/items/:id', async (request, response) => {
  // Get the item's ID from the request parameters
  const { id } = request.params;

  // Find the item by the ID and delete it
  const deletedItem = await Item.findByIdAndDelete(id);

  // If no item is found by the ID, return an error response
  if (!deletedItem) {
    return response.status(404).json({ error: 'No item found by that ID' });
  }

  // If that's not the case, it means the item was found and deleted
  // Return a success response
  response.status(200).json({
    message: 'Item deleted successfully from the database.',
  });
});
