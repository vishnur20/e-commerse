const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model('user', user_schema);