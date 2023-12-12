const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    price: String,
    seller_id:String
});

module.exports = mongoose.model("product", userSchema);