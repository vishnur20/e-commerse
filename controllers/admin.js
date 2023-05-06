const express = require('express');
const path = require('path');
const adminRouter = express.Router();

// db util
const ProductUtil = require('../db_util/product_util.js');
const OrderUtil = require('../db_util/order_util.js');

//GET
adminRouter.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/html/admin/homepage-editor.html'));
});

adminRouter.get('/homepageeditor', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/html/admin/homepage-editor.html'));
});

adminRouter.get('/addproduct', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/html/admin/add-product.html'));
});

adminRouter.get('/editproduct', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/html/admin/edit-product.html'));
});

adminRouter.get('/orders', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/html/admin/admin-orders.html'));
});

adminRouter.get('/orderdetails', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/html/admin/admin-order-details.html'));
});

adminRouter.get('/discounts', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/html/admin/discount.html'));
});

adminRouter.get('/creatediscount', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/html/admin/create-discount.html'))
});

adminRouter.get('/editdiscount', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/html/admin/edit-discount.html'));
});

adminRouter.get('/orderconfirmation', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/html/admin/order-confirmation.html'));
});

adminRouter.get('/products', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/html/admin/admin-collection.html'));
});

adminRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});


//POST
adminRouter.post('/homepageeditor', (req, res) => {});

adminRouter.post('/product', (req, res) => {
    let reqPayload = req.body;
    if(reqPayload == undefined || reqPayload == null) {
        res.send(401);
        return;
    }
    let productDetails = ["sku", "product_name", "brand_name", "image", "actual_price", "is_bestseller", "no_of_offers", "offer_price", "no_of_sizes", "is_on_sale", "description", "composition_washing"];
    let productObj = {};
    for(let i = 0; i < productDetails.length; i++) {
        console.log(productDetails[i] + ': ' + reqPayload[productDetails[i]]);
        if(reqPayload[productDetails[i]] != undefined || reqPayload[productDetails[i]] != null) {
            productObj[productDetails[i]] = reqPayload[productDetails[i]];
        }
    }
    let insertedRec = ProductUtil.insert(productObj);
    if(insertedRec != undefined && insertedRec != null) {
        res.send(JSON.stringify({
            message: 'added successfully',
            _id: insertedRec._id
        }));
    } else {
        res.send(JSON.stringify({
            error: 'Something went wrong',
            message: 'failed to add'
        }));
    }
});

// adminRouter.post('/orders', (req, res) => {
//     let reqPayload = req.body;
//     if(reqPayload == undefined || reqPayload == null) {
//         res.send(401);
//         return;
//     }
//     let orderDetails = [];
//     let orderObj = {};
//     for(let i = 0; i < orderDetails.length; i++) {
//         if(reqPayload[orderDetails[i]] != undefined && reqPayload[orderDetails[i]] != null) {
//             orderObj[orderDetails[i]] = reqPayload[orderDetails[i]];
//         }
//     }
//     let insertedRec = OrderUtil.insert(orderObj);
//     if(insertedRec != undefined && insertedRec != null) {
//         res.send(JSON.stringify({ message: 'added successfully' }));
//     } else {
//         res.send(JSON.stringify({
//             error: 'Something went wrong',
//             message: 'failed to add'
//         }));
//     }
// });

adminRouter.post('/orderdetails', (req, res) => {});
adminRouter.post('/discounts', (req, res) => {});
adminRouter.post('/orderconfirmation', (req, res) => {});


//PUT (update operation)
adminRouter.put('/editproduct', (req, res) => {});
adminRouter.put('/editdiscount', (req, res) => {});


//DELETE

module.exports = adminRouter;