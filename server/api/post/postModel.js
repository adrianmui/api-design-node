var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// has_many categories
var PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    categories: {
        type: [],
        required: true
    }
});

module.exports = mongoose.model('post', PostSchema);
"title": "What's new in Angular 4",