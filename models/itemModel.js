// Import mongoose module which provides an interface to MongoDB
const mongoose = require('mongoose');

// Create a Schema for the items collection in the lost and found system database
const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    locationFound: {
      type: String,
    },
    dateFound: {
      type: Date,
    },
    claimed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create a Model based on the itemSchema
const Item = mongoose.model('Item', itemSchema);

// Export the Item Model to make it available for use in other parts of the application
module.exports = Item;
