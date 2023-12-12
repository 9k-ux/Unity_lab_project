const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Buyer_Id: String,
    Product_name:String,
    seller_id:String

});

module.exports = mongoose.model("orders", userSchema);