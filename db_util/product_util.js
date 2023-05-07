const Product = require('../models/Product');

const ProductUtil = {};
ProductUtil.select = {};
ProductUtil.select.getAllProducts = async() => {
    return await DB.products.find();
};

ProductUtil.select.getProductByID = async(id) => {
    return await new Product({ sku: id }).find();
};

ProductUtil.insert = async(productObj) => {
    console.log(productObj);
    return await new Product(productObj).save();
};

ProductUtil.update = async(id, productObj) => {};
ProductUtil.delete = async(id) => {};

module.exports = ProductUtil;