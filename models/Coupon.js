const mongoose = require('mongoose');

const Coupon_schema = new mongoose.Schema({
    code:  {
        type: String,
        required: true
    },
    percentage: Number,
    status: String,
    start_date: Date,
    end_date: Date
}, {timestamps: true});

module.exports = mongoose.model('Coupon', Coupon_schema);