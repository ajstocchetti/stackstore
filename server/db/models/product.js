'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose');
//var Review   = require('./review');
var reviewSchema = require('./review.js').review;

var productSchema = new mongoose.Schema({

  name: {
    type: String
  },
  capacity: {
    type: String
  },
  weight: {
    type: String
  },
  number: Number,
  source: String,
  range: {
    type: [String]
  },
  type: {
    type: String
  },
  manufacturer: String,
  description: {
    type: String
  },
  category: {
    type: [String]
  },
  inventory: {
    type: Number
  },
  image: {
    type: [String],
    default: 'images/weapon_1.jpg'
  },
  dateIntroduced: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number
  },
  reviews: [reviewSchema],
  ratings: {
    type: Number
  }
});

productSchema.pre("save", function(next) {
  var total = 0;
  this.reviews.forEach(function(review) {
    total += review.stars
  });
  this.ratings = total / this.reviews.length;
  next();
});



var Product = mongoose.model('Product', productSchema);
module.exports = Product;
