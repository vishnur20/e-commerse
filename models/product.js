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
    description: String,
    composition_washing: String
}, {timestamps: true});

module.exports = mongoose.model('Product', Product_schema);