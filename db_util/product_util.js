const Product = require('../models/Product');
const mongoose = require('mongoose');
const getDBConn = async() => {
    return await mongoose.connection;
};

const ProductUtil = {};
ProductUtil.select = {};
ProductUtil.select.getAllProducts = async(offset, limit) => {
    let db = await getDBConn();
    let result = await db.collection('products').find().toArray();//.skip(1).limit(limit)
    return result;
};

ProductUtil.select.getProductByID = async(id) => {
    return await new Product({ sku: id }).find();
};

ProductUtil.insert = async(productObj) => {
    return await new Product(productObj).save();
};

ProductUtil.update = async(id, productObj) => {};
ProductUtil.delete = async(id) => {};

module.exports = ProductUtil;