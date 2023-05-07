const mongoose = require('mongoose');

const Product_schema = new mongoose.Schema({
    sku: String,
    product_name: String,
    brand_name: String,
    image: String,
    actual_price: Number,
    is_bestseller: Boolean,
    no_of_offers: Number,
    offer_price: Number,
    no_of_sizes: Number,
    is_on_sale: Boolean,
    stauts: String,
    description: String,
    composition_washing: String,
    coupons: [String],
    count_in_inventory: Number
}, {timestamps: true});

module.exports = mongoose.model('Product', Product_schema);