const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

const adminRouter = require('./controllers/admin.js');
const userRouter = require('./controllers/user.js');
const userAuthenticator = require('./middlewares/userAuthentication.js');
const requestLogger = require('./middlewares/requestLogger.js');
const PORT = 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);
app.use(session({
    secret: "vishnuraja",
    resave: false,
    saveUninitialized: false
}));
// user validator middleware here...
app.use(userAuthenticator);

app.get('/login', (req, res) => {
    // load login page
    res.sendFile('G:/e-commerse/public/html/login.html');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    // check if user is already registered
    // if no, notify that user not exists
    // if yes, redirect him to home page (user/admin) accordingly
    let resMessage = {
        isUserAdded: true,
        redirectUrl: "/home"
    };
    res.send(JSON.stringify(resMessage));
});

app.use('/', userRouter);
app.use('/admin/', adminRouter);

app.listen(PORT, async() => {
    console.log(`server has started and listening at port ${PORT}...`);
    await mongoose.connect(process.env.dbConnectionUrl);
    console.log('DB connected');
});
