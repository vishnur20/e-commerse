const mongoose = require('mongoose');

const Order_schema = new mongoose.Schema({
    order_no: String,
    date: Date,
    payment_address: String,
    fulfillment_status: String,
    total: Number
}, {timestamps: true});

module.exports = mongoose.model('Order', Order_schema);