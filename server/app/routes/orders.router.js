'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
require('../../db/models')
var Order = mongoose.model('Order');

module.exports = router;
// var _ = require('lodash');

// var lookupCart = function(req) {
//   Order.findOne({ session: req.session.id, status: 'cart' })
//       .then(function(cart) {
//         console.log("in lookup ", cart)
//         return cart || -1;
//       })
//       .then(null, function(err) {
//         return -1
//       })
// }
var lookupCart = function(req) {
  if(req.user) {
    return Order.findOne({ user: req.user, status: 'cart' })
      .then(function(cart) {
        return cart || -1;
      })
      .then(null, function(err) {
        return -1
      })
  }
  else if(req.session) {
    return Order.findOne({ session: req.session.id, status: 'cart' })
    .then(function(cart) {
      return cart || -1;
    })
    .then(null, function(err) {
      return -1
    })
  }
  else // no cart found
    return Promise.resolve(-1);
}

// get all orders
router.get('/', function(req, res, next) {
  Order.find()
    .then(function(orders) {
      res.send(orders);
    })
    .catch(function(err) {
      next();
    })
});

// get order by order ID
router.get('/id/:id', function(req, res, next) {
  var userId = req.params.id;
  Order.findById(req.params.id)
    .then(function(order) {
      res.send(order);
    })
    .catch(function(err) {
      next();
    });
});

// get orders by user
router.get('/user/:id', function(req, res, next) {
  var userId = req.params.id;
  Order.find({ user: userId })
    .then(function(orders) {
      res.send(orders);
    })
    .catch(function(err) {
      next();
    });
});

// get route for current user
router.get('/current', function(req, res, next) {
  lookupCart(req)
    .then(function(cart) {
      if (cart != -1) {
        res.send(cart)
      } else {
        // no cart found
        var cartUser = { session: req.session.id }
        if (req.user) {
          cartUser = { user: req.user }
        }
        cartUser.status = "cart";
        new Order(cartUser).save().then(function(cart) {
          res.json(cart);
        })
      }
    })
})

// save cart
router.post('/add/:product/:qty', function(req, res, next) {
  var qty = +req.params.qty || 0;
  if(qty <1) {
    return res.sendStatus(400);
  }
  var cartId = lookupCart(req);
  if(cartId == -1) {
    return res.sendStatus(400);
  }
  var cart = Order.findById(cartId);
  cart.items.push({
    product: req.params.product,
    quantity: qty
  });
  cart.save().then(function() {
    res.sendStatus(202)
  })
  .then(null, next)
});
