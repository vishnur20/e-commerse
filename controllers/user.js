const express = require('express');
const mongoose = require('mongoose');
const user = require('../models/user.js');
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    // load user index page
    res.send("user home page");
});

userRouter.get('/register', (req, res) => {
    res.sendFile('G:/e-commerse/public/html/user/register.html');
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

userRouter.get('/collections', (req, res) => {  // how to load contents
    // load collections page
    // note: page contents are loaded using AJAX
});

userRouter.get('/product?id=#', (req, res) => { // how to load specific product?
    // get the product details page
    // load the product content for that id
});

userRouter.post('/cart', (req, res) => {    // not '/product' POST
    // add the product to cart table
    // notify user the status
});

userRouter.get('/', () => {});

 


module.exports = userRouter;