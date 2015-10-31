'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var addressSchema = require('./address.js').address;
var Product = require('./product.js');
var _ = require('lodash');

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
  total: Number,
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

schema.statics.getUserCart = function(req) {
  console.log('order model getUserCart');
  var searches = [];
  if(req.user && req.user._id) {
    searches.push(this.model('Order').find({ user: req.user._id, status: 'cart' }).populate('items.product'))
  }
  if(req.session && req.session.id) {
    searches.push(this.model('Order').find({ session: req.session.id, status: 'cart' }).populate('items.product'))
  }
  return Promise.all(searches).then(function(vals) {
    for(var x=0; x<vals.length; x++) {
      if(vals[x][0]) {
        return vals[x][0];
      }
    }
    return null;
  })
}

// when a user logs in, update their cart with their user
schema.statics.signInCart = function(req) {
  console.log("order model signInCart", this);
  if( !req.user || !req.session ) {
    // user or session missing
    console.error("Could not merge carts - no session or user")
    return null;
  }
  var theSchema = this;
  var searches = [
    this.model('Order').find({ session: req.session.id, status: 'cart' }),
    this.model('Order').find({ user: req.user._id, status: 'cart' })
  ];
  return Promise.all(searches).then(function(carts) {
    
    var sessionCart    = carts[0];
    var storedUserCart = carts[1];
    var allCarts = carts[0].concat(carts[1]);
      sessionCart.items.forEach(function(item) {
        storedUserCart.updateCart(item.product, item.quantity);
        // no need to save newCart, updateCart does that for us
      });
      sessionCart.remove({ _id: cart._id }).exec();
    
    return storedUserCart;
  })
}

schema.methods.calcTotalPrice = function() {
  var totalPrice = 0;
  this.items.forEach(function(item) {
    totalPrice += (item.quantity * item.unitPrice);
  });
  this.total = totalPrice;
  return this;
}

schema.methods.updateCart = function(productId, quantity) {
  console.log('order model updateCart:' , 'productId', productId, '| quantity', quantity );
  var index = _.pluck(this.items, 'product._id')
    .map(function(id) { return id.toString() })
    .indexOf(productId);

    console.log(index);
  if(quantity>0) {
    if(index != -1) {
      this.items[index].quantity = quantity;
    } else {
      // lookup product price
      var cart = this;
      console.log('the update cart this',cart);
      return Product.findById(productId)
      .then(function(product) {
        cart.items.push({
          product: productId,
          quantity: quantity,
          unitPrice: product.price
        });
        cart.calcTotalPrice();
        return cart.save();
      })
      // .then(null, function(err) { console.error(err)})
    }
  } else {
    if(index != -1) {
      this.items.splice(index,1);
    }
  }
  this.calcTotalPrice()
  return this.save()
}

// schema.statics.findPopulatedOrder = function()

var Order = mongoose.model('Order', schema);
Order.on('error', console.log)
