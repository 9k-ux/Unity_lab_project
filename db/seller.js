// models/seller.js
const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: String,
  // Add other seller-related fields as needed
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;