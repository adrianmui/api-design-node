var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// has_many categories
var PostSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: categories
    }]
});

module.exports = mongoose.model('post', PostSchema);