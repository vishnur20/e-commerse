const mongoose = require('mongoose');

const order_schema = new mongoose.Schema({
    order_no: String,
    date: Date,
    payment_address: String,
    fulfillment_status: String,
    total: Number
}, {timestamps: true});

module.exports = mongoose.model('order', order_schema);