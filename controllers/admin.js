const express = require('express');
const adminRouter = express.Router();

// TO DO: write a middleware for checking if the current user is an admin

adminRouter.get("/", (req, res) => {
    res.send('inside admin router');
});

module.exports = adminRouter;