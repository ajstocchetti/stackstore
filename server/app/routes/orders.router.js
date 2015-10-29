'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
// require('../../db/models')
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');

module.exports = router;
// var _ = require('lodash');

// Require access middleware functions
var accessMiddleware = require('./access.middleware'),
    hasAdminRights = accessMiddleware.hasAdminRights


var lookupCart = function(req) {
  return Order.getUserCart(req)
    .then(function(cart) {
      return cart;
    })
}
var lookupCartOrCreate = function(req) {
  return lookupCart(req)
    .then(function(cart) {
      if(!cart) {
        var cartUser = { session: req.session.id }
        if (req.user) {
          cartUser = { user: req.user }
        }
        cartUser.status = "cart";
        return new Order(cartUser).save()
      } else {
        return cart;
      }
    })
}

// get route for current user
router.get('/current', function(req, res, next) {
  lookupCart(req)
  .then(function(cart) {
    res.send(cart)
  })
  .then(null, next)
});

// get all orders
router.get('/', hasAdminRights, function(req, res, next) {
  Order.find()
    .then(function(orders) {
      res.send(orders);
    })
    .catch(next)
});

// get order by order ID
router.get('/:id', function(req, res, next) {
  var userId = req.params.id;
  Order.findById(req.params.id)
    .then(function(order) {
      res.send(order);
    })
    .catch(next);
});


router.put('/:id', hasAdminRights, function(req, res, next) {
  Order.findById(req.params.id)
  .then(function(order) {
    order.status = req.body.orderStatus;
    return order.save()
  })
  .then(function(order) {
    res.json(order);
  })
})


// get orders by user
router.get('/user/:id', function(req, res, next) {
  var userId = req.params.id;
  Order.find({ user: userId })
    .then(function(orders) {
      res.send(orders);
    })
    .then(null, next)
});

router.post('/cart', function(req, res, next) {
  var prodId = req.body.product;
  var quantity = req.body.quantity;
  if(!(quantity && prodId))
    return res.send(400);

  lookupCartOrCreate(req).then(function(cart) {
    cart.updateCart(prodId, quantity)
      .then(function(cart) {
        res.send(cart);
      })
      .then(null, next)
    })
    .then(null, next)
});

router.delete('/cart', function(req, res, next) {
  var prodId = req.body.product;
  if(!prodId)
    return res.send(400);

  lookupCart(req).then(function(cart) {
    cart.updateCart(prodId, 0)
      .then(function(cart) {
        res.send(cart);
      })
      .then(null, next)
    })
    .then(null, next)
});

router.get('/cart/merge', function(req, res, next) {
  Order.signInCart(req)
  .then(function(cart) {
    res.send(cart);
  })
  .then(null, next);
});
