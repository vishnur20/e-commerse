const Coupon = require('../models/Coupon.js');

const DiscountUtil = {}
DiscountUtil.select = (id) => {};
DiscountUtil.insert = async(discountCouponObj) => {
    return await new Coupon(discountCouponObj).save;
};
DiscountUtil.update = (id, discountCouponObj) => {};
DiscountUtil.delete = (id) => {};

module.exports = DiscountUtil;