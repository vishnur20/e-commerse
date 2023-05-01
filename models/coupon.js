const mongoose = require('mongoose');

const coupon_schema = new mongoose.Schema({
    code: String,
    percentage: Number
}, {timestamps: true});

mongoose.model('coupon', coupon_schema);