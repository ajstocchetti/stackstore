'use strict';

var crypto   = require('crypto');
var mongoose = require('mongoose');
var Product  = require('./product');
var User     = require('./user');





var reviewSchema = new mongoose.Schema({
	body: {
		type: String,
		required: true 
	},
	stars: {
		type: Number,
		required: true
	},
	by: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	}
});



reviewSchema.path('body').validate(function(text){
	return text.length > 9;
}, 'Rating must be at least 10 characters');


reviewSchema.virtual('snippet').get(function(){
	return this.review.body.slice(0,23) + '...';
});

var Review     = mongoose.model('Review', reviewSchema);
module.exports = Review;
