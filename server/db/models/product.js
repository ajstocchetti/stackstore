'use strict';

var crypto   = require('crypto');
var mongoose = require('mongoose');
//var Review   = require('./review');
var reviewSchema = require('./review.js');

var productSchema = new mongoose.Schema({
	name:{
		type: String
	},
	description :{
		type: String
	},
	category: {
		type: [String]
	},
	inventory: {
		type: Number
	},
	image: {
		type: String,
		default: 'path/to/default/image'
	},
	dateIntroduced:{
		type: Date,
		default: Date.now
	},
	unitOfSale : {
		amount: Number,
		unit: String
	},
	price: {
		type: Number
	},
	reviews : [ reviewSchema ],
    ratings: { type: Number }

});

productSchema.pre("save", function(next) {
    var total = 0;
    this.reviews.forEach(function(review){
         total += review.stars
        });
    this.ratings = total/this.reviews.length;
    next();
});

//productSchema.pre('save').get(function(){
//	var total = 0;
//
//	this.reviews.forEach(function(review){
//		total+= review.stars;
//	});
//	return total/this.reviews.length;
//});
//
//


var Product    = mongoose.model('Product', productSchema);
module.exports = Product;














/*

app.put('api/review', function(req,res){
	stuff

	updatedProduct.save(stars);
})

*/











