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
                    //
                    console.log('user is valid');
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
                    if(req.originalUrl === '/login' && req.method === 'POST') {
                        res.setHeader('content-type', 'application/json');
                        res.send({ message: 'user added' });
                        return;
                    }
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
    try {
        const user = require('../models/user.js');
        let dbUser = await user.findOne({
            email: useremail,
            password: userpass
        }).exec();
        //
        console.log(dbUser);
        console.log(dbUser != undefined && dbUser.password == userpass);
        return dbUser != undefined && dbUser.password == userpass;
    } catch(err) {
        console.log(`DB ERROR: ${err}`);
    }
    return false;
};

module.exports = userAuthenticator;