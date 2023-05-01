var userAuthenticator = (req, res, next) => {
    console.log('\ninside userAuthenticator middleware...');
    console.log(`session: ${JSON.stringify(req.session)}`);

    // check if the req has valid session (means - user already logged in)
    // check for cookie-session match

    if(req.cookies != undefined && req.cookies.id == req.session.cookie.id) {
        console.log('user has session');
        next();
    } else {
        if(req.originalUrl == '/login' && req.method == 'POST') {
            let reqPayload = req.body;
            if(reqPayload != undefined && reqPayload.useremail != undefined && reqPayload.userpass != undefined) {
                // authenticate user
                let isValidUser = authenticateUser(reqPayload.useremail,reqPayload. userpass);
                if(isValidUser) {
                    // create cookie and set into session obj
                    let randNum = Math.random().toString();
                    let cookieID = randNum.substring(0, randNum.length - 2);
                    let cookieObj = {
                        id: cookieID,
                        maxAge: 90000,
                        httpOnly: true
                    };
                    req.session.cookie = cookieObj;
                    console.log('Cookie is created');
                    console.log(`Req cookie: ${cookieObj}`);
                    console.log(`Session cookie: ${req.session.cookie}`);
                    res.redirect('/');
                }
            }
        } else if(req.originalUrl == "/register") {
            // redirect to login page
            console.log('no session available');
            next();
        } else if(req.originalUrl != "/login") {
            // redirect to login page
            console.log('no session available');
            res.redirect('/login');
        } else {
            next();
        }
    }
};

var authenticateUser = async(useremail, userpass) => {
    // const mongoose = require('mongoose');
    const user = require('../models/user.js');
    // let dbUser = user.find({
    //     email: useremail
    // });
    let dbUser = user.find({});
    console.log(dbUser);
    return dbUser.password == userpass;
};

module.exports = userAuthenticator;