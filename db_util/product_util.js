const Product = require('../models/Product');
const mongoose = require('mongoose');
const getDBConn = () => {
    return mongoose.connection;
};

const ProductUtil = {};
ProductUtil.select = {};
ProductUtil.select.getAllProducts = async(criteriaObj, cursorObj) => {
    try {
        let offset, limit;
        if(criteriaObj == undefined || criteriaObj == null) {
            criteriaObj = {};
        }
        if(cursorObj == undefined || cursorObj == null) {
            offset = cursorObj.offset != undefined && cursorObj.offset != null ? cursorObj.offset : undefined;
            limit = cursorObj.limit != undefined && cursorObj.limit != null ? cursorObj.limit : undefined;
        } else {
            offset = 1;
            limit = Number.MAX_VALUE;
        }

        let db = await getDBConn();
        let result = await db.collection('products').find(criteriaObj)
        .skip(1).limit(limit).toArray();
        return result;
    } catch(err) {
        console.log(`ERROR: ${err}`);
        return [];
    }    
};

ProductUtil.select.getBestSellerProducts = async() => {
    try {
        let queryObj = { is_bestseller: true };
        return await db.collection('products').find(queryObj).toArray();
    } catch(err) {
        console.log(`ERROR: ${err}`);
        return [];
    }
};

ProductUtil.select.getProductByID = async(id) => {
    try {
        if(id == undefined || id == null) {
            return [];
        }
        let db = await getDBConn();
        return await db.collection('products').findOne({ sku: id });
    } catch(err) {
        console.log(`ERROR: ${err}`);
        return [];
    }
};

ProductUtil.insert = async(productObj) => {
    try {
        return await new Product(productObj).save();
    } catch(err) {
        console.log(`ERROR: ${err}`);
        return [];
    }
};

ProductUtil.update = async(id, productObj) => {
    try {
        // code
    } catch(err) {
        console.log(`ERROR: ${err}`);
        return [];
    }
};
ProductUtil.delete = async(id) => {
    try {
        // code
    } catch(err) {
        console.log(`ERROR: ${err}`);
        return [];
    }
};

module.exports = ProductUtil;