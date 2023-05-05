const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

// routers
const adminRouter = require('./controllers/admin.js');
const userRouter = require('./controllers/user.js');

// db models
const user = require('./models/user.js');

// middlewares
const userAuthenticator = require('./middlewares/userAuthentication.js');
const requestLogger = require('./middlewares/requestLogger.js');
const adminValidator = require('./middlewares/adminValidator.js');
const PORT = 5000;

const authenticateUser = async(useremail, userpass) => {
    try {
        let dbUser = await user.findOne({
            email: useremail,
            password: userpass
        }).exec();
        //
        console.log(dbUser);
        if(dbUser == undefined || dbUser != null) {
            console.log(dbUser != undefined && dbUser.password == userpass);
            if(dbUser != undefined && dbUser.password == userpass) {
                if(dbUser.isAdmin) {
                    return 'admin';
                } else {
                    return 'user'
                }
            }
        }
    } catch(err) {
        console.log(`DB ERROR: ${err}`);
    }
    return '';
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        saveUninitialized: false,
        resave: false
    }
}));

app.get('/login', (req, res) => {
    // load login page
    if(req.session.useremail != undefined && req.session.useremail != '') {
        res.redirect('/');
    } else {
        res.sendFile(path.resolve(__dirname + '/public/html/login.html'));
    }
});

// user validator middleware here...
app.use(userAuthenticator);

app.post('/login', async(req, res) => {
    let reqPayload = req.body;
    if(req.session.useremail == undefined || req.session.useremail == '') {
        if(reqPayload != undefined && reqPayload.useremail != undefined && reqPayload.userpass != undefined) {
            // authenticate user
            let isValidUser = await authenticateUser(reqPayload.useremail,reqPayload. userpass);
            if(isValidUser === 'admin' || isValidUser === 'user') {
                //
                console.log('isValidUser: ' + isValidUser);
                console.log('user is valid');
                // create session obj
                req.session.useremail = reqPayload.useremail;
                if(isValidUser === 'admin') {
                    req.session.isAdmin = true;
                }
                console.log('Session is created');
                console.log(`Session obj: ${JSON.stringify(req.session)}`);

                if(req.originalUrl === '/login' && req.method === 'POST') {
                    res.setHeader('content-type', 'application/json');
                    res.send({
                        message: 'valid user',
                        redirectUrl: '/'
                    });
                    return;
                }
            } else {
                if(req.originalUrl === '/login' && req.method === 'POST') {
                    res.setHeader('content-type', 'application/json');
                    res.send({
                        message: 'user doesn\'t exists',
                        isUserNotExists: true
                    });
                    return;
                }
            }
        }
    }
    res.redirect('/');
});

app.use(adminValidator);
app.use('/', userRouter);
app.use('/admin/', adminRouter);

app.listen(PORT, async() => {
    console.log(`server has started and listening at port ${PORT}...`);
    await mongoose.connect(process.env.dbConnectionUrl);
    console.log('DB connected');
});
