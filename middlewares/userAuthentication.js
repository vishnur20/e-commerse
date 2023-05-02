var userAuthenticator = (req, res, next) => {
    console.log('\ninside userAuthenticator middleware...');
    console.log(`session: ${JSON.stringify(req.session)}`);

    // check if the req has valid session (means - user already logged in)
    // check for cookie-session match

    // if(req.session != undefined && req.session.useremail != undefined && req.session.useremail != '') {
    //     console.log('user has session');
    //     next();
    // } else {
    //     if(req.originalUrl == '/login' && req.method == 'POST') {
            // let reqPayload = req.body;
            // if(reqPayload != undefined && reqPayload.useremail != undefined && reqPayload.userpass != undefined) {
            //     // authenticate user
            //     let isValidUser = authenticateUser(reqPayload.useremail,reqPayload. userpass);
            //     if(isValidUser) {
            //         //
            //         console.log('user is valid');
            //         // create session obj
            //         req.session.useremail = reqPayload.useremail;
            //         console.log('Session is created');
            //         console.log(`Session obj: ${JSON.stringify(req.session)}`);

            //         if(req.originalUrl === '/login' && req.method === 'POST') {
            //             res.setHeader('content-type', 'application/json');
            //             res.send({
            //                 message: 'user added',
            //                 redirectUrl: '/'
            //             });
            //             return;
            //         }
            //         res.redirect('/');
            //     }
            // }
//         } else if(req.originalUrl == "/register") {
//             // redirect to login page
//             console.log('no session available /register');
//             // next();
//         } else if(req.originalUrl != "/login") {
//             // redirect to login page
//             console.log('no session available /login');
//             res.redirect('/login');
//         }
//         next();
//     }
    next();
};

// var authenticateUser = async(useremail, userpass) => {
//     try {
//         const user = require('../models/user.js');
//         let dbUser = await user.findOne({
//             email: useremail,
//             password: userpass
//         }).exec();
//         //
//         console.log(dbUser);
//         if(dbUser == undefined || dbUser != null) {
//             console.log(dbUser != undefined && dbUser.password == userpass);
//             return dbUser != undefined && dbUser.password == userpass;
//         } else {
//             return false;
//         }
//     } catch(err) {
//         console.log(`DB ERROR: ${err}`);
//     }
//     return false;
// };

module.exports = userAuthenticator;