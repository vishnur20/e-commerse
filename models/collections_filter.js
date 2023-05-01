const mongoose = require('mongoose');

const collections_filter_schema = new mongoose.Schema({
    filter_type: String,
    values: [String]
});

module.exports = mongoose.model('collections_filter', collections_filter_schema);