const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

const adminRouter = require('./controllers/admin.js');
const userRouter = require('./controllers/user.js');
const user = require('./models/user.js');
const userAuthenticator = require('./middlewares/userAuthentication.js');
const requestLogger = require('./middlewares/requestLogger.js');
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
            return dbUser != undefined && dbUser.password == userpass;
        } else {
            return false;
        }
    } catch(err) {
        console.log(`DB ERROR: ${err}`);
    }
    return false;
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
        res.sendFile('G:/e-commerse/public/html/login.html');
    }
});

// user validator middleware here...
// app.use(userAuthenticator);

app.post('/login', (req, res) => {
    let reqPayload = req.body;
    if(req.session.useremail == undefined || req.session.useremail == '') {
        if(reqPayload != undefined && reqPayload.useremail != undefined && reqPayload.userpass != undefined) {
            // authenticate user
            let isValidUser = authenticateUser(reqPayload.useremail,reqPayload. userpass);
            if(isValidUser) {
                //
                console.log('user is valid');
                // create session obj
                req.session.useremail = reqPayload.useremail;
                console.log('Session is created');
                console.log(`Session obj: ${JSON.stringify(req.session)}`);

                if(req.originalUrl === '/login' && req.method === 'POST') {
                    res.setHeader('content-type', 'application/json');
                    res.send({
                        message: 'user added',
                        redirectUrl: '/'
                    });
                    return;
                }
            }
        }
    }
    res.redirect('/');
});

app.use('/', userRouter);
app.use('/admin/', adminRouter);

app.listen(PORT, async() => {
    console.log(`server has started and listening at port ${PORT}...`);
    await mongoose.connect(process.env.dbConnectionUrl);
    console.log('DB connected');
});
