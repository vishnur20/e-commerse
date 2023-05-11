const mongoose = require('mongoose');
const Coupon = require('../models/Coupon.js');
const getDBConn = async() => {
    return await mongoose.connection;
};

const DiscountUtil = {}
DiscountUtil.select ={}
DiscountUtil.select.getAllCoupons = async() => {
    let db = await getDBConn();
    return await db.collection('coupons').find().toArray();
};
DiscountUtil.insert = async(discountCouponObj) => {
    return await new Coupon(discountCouponObj).save();
};
DiscountUtil.update = (id, discountCouponObj) => {};
DiscountUtil.delete = (id) => {};

module.exports = DiscountUtil;