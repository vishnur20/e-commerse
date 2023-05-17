const express = require('express');
const userRouter = express.Router();
const user = require('../models/User.js');
const path = require('path');

// db utils
const ProductUtil = require('../db_util/product_util.js');
const NewArrivalUtil = require('../db_util/newarrival_util.js');

// GET methods
userRouter.get('/', (req, res) => {
    // load user index page
    if(req.session.useremail == undefined || req.session.useremail == '') {
        res.redirect('/login');
    } else {
        console.log('load index page');
        res.sendFile(path.resolve(__dirname + '/../public/html/user/index.html'));
    }
});

userRouter.get('/banners', (req, res) => {
    // get banners
});

userRouter.get('/bestsellerproducts', async(req, res) => {
    // get best-seller products
    res.setHeader('content-type', 'application/json');
    res.send(await ProductUtil.select.getBestSellerProducts());
});

userRouter.get('newarrivals', async(req, res) => {
    // get new-arrivals
    res.setHeader('content-type', 'application/json');
    res.send(await NewArrivalUtil.select.getAllNewArrivals());
});

userRouter.get('/register', (req, res) => {
    if(req.session.useremail == undefined || req.session.useremail == '') {
        res.sendFile(path.resolve(__dirname + '/../public/html/user/register.html'));
    } else {
        res.sendFile(path.resolve(__dirname + '/../public/html/user/index.html'));
    }
});

userRouter.get('/logout', (req, res) => {
    req.session.destroy();
    console.log('session destroyed');
    res.redirect('/login');
});

userRouter.get('/collections', (req, res) => {  // how to load contents
    // load collections page
    res.sendFile(path.resolve(__dirname + '/../public/html/user/collections.html'));
    // note: page contents are loaded using AJAX
});

userRouter.get('/product', (req, res) => { // how to load specific product?
    // get the product details page
    res.sendFile(path.resolve(__dirname + '/../public/html/user/product.html'));
    // load the product content for that id
});

userRouter.get('/getproductdetails', async(req, res) => {
    let productID = req.query.id;
    let productObj = await ProductUtil.select.getProductByID(productID);
    res.setHeader('content-type', 'application/json');
    res.send(productObj);
});

userRouter.get('/cart', (req, res) => {    // not '/product' POST
    // add the product to cart table
    res.sendFile(path.resolve(__dirname + '/../public/html/user/cart.html'));
    // notify user the status
});


//POST methods
userRouter.post('/register', async(req, res) => {
    console.log('inside /register POST');
    // get the user input
    let reqPayload = req.body;
    let useremail = reqPayload.useremail;
    let userpass = reqPayload.userpass;
    if(useremail == undefined || useremail == '' || userpass == undefined || userpass == '') {
        console.log('empty form');
        return;
    }
    const newUser = new user({
        email: useremail,
        password: userpass
    });
    // put an entry in db
    await newUser.save();
    console.log('user added to DB');
    res.setHeader('content-type', 'application/json');
    res.send({redirectUrl: '/'});
});


module.exports = userRouter;