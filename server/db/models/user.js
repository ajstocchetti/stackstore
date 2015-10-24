'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var addressSchema = require('./address.js').address;
var Order = require('./order');
var Review = require('./review').reviewModel;
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);

var schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  salt: {
    type: String,
    select: false
  },
  twitter: {
    id: String,
    username: String,
    token: String,
    tokenSecret: String,
    select: false
  },
  facebook: {
    id: String,
    select: false
  },
  google: {
    id: String,
    select: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  addresses: [addressSchema],
  productsPurchased: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Product'
  }]
});


/*
   HOOKS
*/

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
  var hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

schema.pre('save', function(next) {

  if (this.isModified('password')) {
    this.salt = this.constructor.generateSalt();
    this.password = this.constructor.encryptPassword(this.password, this.salt);
  }

  next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function(candidatePassword) {
  return encryptPassword(candidatePassword, this.salt) === this.password;
});

/*
   VALIDATIONS
*/
function emailVal(email) {
  return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}
schema.path('email').validate(emailVal, "Email is invalid")


/*
   CONVENIENCE METHODS
*/

// Get orders for a user that is not in cart status
schema.methods.getOrders = function() {
  console.log('getting orders for:', this.email);
  return Order.find({ 
    user: this._id,
    status: { $ne: 'cart' }
  }).exec()

};

schema.methods.getReviews = function() {
  console.log('getting reviews for:', this.email);
  return Review.find({ author: this._id }).exec()
}

// Find or create cart...not sure if we cant to do the create part here
// schema.methods.getCart = function() {
//   Order.findOne({ 
//     user: this._id,
//     status: 'cart' 
//   }).exec()
//   .then(function(cart) { // error check for no cart
//     if (!cart) {
//       return Order.create({
//         user: this._id,
//         status: 'cart'
//       })
//     }
//   })
//   .then(function(cart) {
//     return cart;
//   })
// }
var User = mongoose.model('User', schema);


User.on('error', console.log)
