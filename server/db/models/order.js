'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var addressSchema = require('./address.js').address;

var schema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['cart', 'created', 'processing', 'cancelled', 'completed'],
    default: 'cart'
  },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    session: { type: String },
  email: String,
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: Number,
    unitPrice: Number
  }],
  billing: {
    address: [ addressSchema ],
    cardNumber: { type: Number },
    expiration: { type: Date },
    csv: { type: Number },
    nameOnCard: { type: String }
  },
  shipping: {
    name: String,
    address: [ addressSchema ]
  }
});

// function validateOwner(owner) {
//   return owner && (owner.user || owner.session);
// }
// schema.path('owner').validate(validateOwner, "Order doesn't have an owner");
function v2(session) {
  return session || this.owner;
}
schema.path('session').validate(v2, "Order doesn't have an owner")

var Order = mongoose.model('Order', schema);
Order.on('error', console.log)

module.exports = Order;