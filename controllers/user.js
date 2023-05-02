const express = require('express');
const mongoose = require('mongoose');
const user = require('../models/user.js');
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    // load user index page
    if(req.session.useremail == undefined || req.session.useremail == '') {
        res.redirect('/login');
    } else {
        console.log('load index page');
        res.sendFile('G:/e-commerse/public/html/user/index.html');
    }
});

userRouter.get('/register', (req, res) => {
    if(req.session.useremail == undefined || req.session.useremail == '') {
        res.sendFile('G:/e-commerse/public/html/user/register.html');
    } else {
        res.sendFile('G:/e-commerse/public/html/user/index.html');
    }
});

userRouter.post('/register', (req, res) => {
    console.log('inside /register POST');
    // get the user input
    let reqPayload = req.body;
    let useremail = reqPayload.useremail;
    let userpass = reqPayload.userpass;
    if(useremail == undefined || useremail == '' || userpass == undefined || userpass == '') {
        console.log('empty form');
        return;
    }

    // const mongoose = require('mongoose');
    const newUser = new user({
        email: useremail,
        password: userpass
    });
    // put an entry in db
    newUser.save();
    console.log('user added to DB');
    res.setHeader('content-type', 'application/json');
    res.send({redirectUrl: '/'});
});

userRouter.get('/logout', (req, res) => {
    req.session.destroy();
    console.log('session destroyed');
    res.redirect('/login');
});

userRouter.get('/collections', (req, res) => {  // how to load contents
    // load collections page
    res.sendFile('G:/e-commerse/public/html/user/collections.html');
    // note: page contents are loaded using AJAX
});

userRouter.get('/product?id=#', (req, res) => { // how to load specific product?
    // get the product details page
    res.sendFile('G:/e-commerse/public/html/user/product.html');
    // load the product content for that id
});

userRouter.post('/cart', (req, res) => {    // not '/product' POST
    // add the product to cart table
    res.sendFile('G:/e-commerse/public/html/user/cart.html');
    // notify user the status
});


module.exports = userRouter;