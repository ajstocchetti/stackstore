'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    body: { type: String, required: true },
    stars: { type: Number, required: true },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});

mongoose.model('Review', schema);

schema.path('body').validate(function(text){
    return text.length > 9;
}, 'Rating must be at least 10 characters');


schema.virtual('snippet').get(function(){
    return this.review.body.slice(0,23) + '...';
});

var Review     = mongoose.model('Review', schema);
module.exports = Review;

module.exports = {
    review: schema
};
