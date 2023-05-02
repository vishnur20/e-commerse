const express = require('express');
const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    res.sendFile('G:/e-commerse/public/html/admin/homepage-editor.html');
});

adminRouter.get('/homepageeditor', (req, res) => {
    res.sendFile('G:/e-commerse/public/html/admin/homepage-editor.html');
});

adminRouter.post('/homepageeditor', (req, res) => {

});

adminRouter.get('/addproduct', (req, res) => {
    res.sendFile('G:/e-commerse/public/html/admin/add-product.html');
});

adminRouter.post('/addproduct', (req, res) => {});

adminRouter.get('/editproduct', (req, res) => {
    res.sendFile('G:/e-commerse/public/html/admin/edit-product.html');
});

adminRouter.post('/editproduct', (req, res) => {});

adminRouter.get('/orders', (req, res) => {
    res.sendFile('G:/e-commerse/public/html/admin/admin-orders.html');
});

adminRouter.post('/orders', (req, res) => {});

adminRouter.get('/orderdetails', (req, res) => {
    res.sendFile('G:/e-commerse/public/html/admin/admin-order-details.html');
});

adminRouter.post('/orderdetails', (req, res) => {});

adminRouter.get('/editdiscount', (req, res) => {
    res.sendFile('G:/e-commerse/public/html/admin/edit-discount.html');
});

adminRouter.post('/editdiscount', (req, res) => {});

adminRouter.get('/orderconfirmation', (req, res) => {
    res.sendFile('G:/e-commerse/public/html/admin/order-confirmation.html');
});

adminRouter.post('/orderconfirmation', (req, res) => {});

adminRouter.get('/collections', (req, res) => {
    res.sendFile('G:/e-commerse/public/html/admin/admin-collection.html');
});

adminRouter.post('/collections', (req, res) => {});

adminRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});


module.exports = adminRouter;