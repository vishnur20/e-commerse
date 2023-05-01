const mongoose = require('mongoose');

const admin_home_content_schema = new mongoose.Schema({
    name: String,
    bg_color: String,
    text_color: String,
    font_size: Number,
    font_weight: String,
    text_align: String,
    logo_image: String,
    slides: [{
        store_name: String,
        content: String
    }]

}, {timestamps: true});

module.exports = mongoose.model('admin_home_content', admin_home_content_schema);