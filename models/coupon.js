const mongoose = require('mongoose');

const Coupon_schema = new mongoose.Schema({
    code: String,
    percentage: Number
}, {timestamps: true});

module.exports = mongoose.model('Coupon', Coupon_schema);