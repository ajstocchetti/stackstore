'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var addressSchema = require('./address.js').address;
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
  var searches = [];
  if(req.user && req.user._id) {
    searches.push(this.model('Order').find({ user: req.user._id }))
  }
  if(req.session && req.session.id) {
    searches.push(this.model('Order').find({ session: req.session.id }))
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

schema.methods.updateCart = function(productId, quantity) {
  var index = _.pluck(this.items, 'product')
    .map(function(obj) { return obj.toString() })
    .indexOf(productId);

  if(quantity>0) {
    if(index != -1) {
      this.items[index].quantity = quantity;
    } else {
      // need to add price
      this.items.push({
        product: productId,
        quantity: quantity
      });
    }
  } else {
    if(index != -1) {
      this.items.splice(index,1);
    }
  }
  return this.save()
}

schema.statics.findPopulatedOrder = function(id) {
  return this.model('Order').findById(id).populate('user')
  .then(function(order) {
    var options = {
      path: 'items.product',
      model: 'Product'
    };
    return Order.populate(order, options)
  })
}


// this only works when the items are populated
schema.virtual('totalPrice').get(function() {
  if (this.items.length === 0) return 0
  return this.items.map(function(item) {
    return item.product.price * item.quantity;
  }).reduce(function(prev, curr) {
    return prev + curr;
  })
})
var Order = mongoose.model('Order', schema);
Order.on('error', console.log)
