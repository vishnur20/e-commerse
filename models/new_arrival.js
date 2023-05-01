const mongoose = require('mongoose');

const new_arrival_schema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    shop_address: String
}, {timestamps: true});

mongoose.model('new_arrival', new_arrival_schema);