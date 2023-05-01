const express = require('express');
const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
    res.send('inside admin router');
});

module.exports = adminRouter;