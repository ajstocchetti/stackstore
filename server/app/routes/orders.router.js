'use strict';
var router = require('express').Router();
var join = require('bluebird').join;
var mongoose = require('mongoose');
// require('../../db/models')
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');

module.exports = router;
// var _ = require('lodash');


router.get('/test', function(req, res) {
  console.log(Promise.join)
  return Order.getUserCart(req).then(function(x) {
    res.send(x)
  })
});


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

// get all orders
router.get('/', function(req, res, next) {
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
  lookupCart(req).then(res.send)
})

router.post('/cart', function(req, res, next) {
  var prodId = req.body.product;
  var quantity = req.body.quantity;
  if(!(quantity && prodId))
    return res.send(400);

    join(lookupCartOrCreate(req), Product.findById(prodId), function(cart, product) {
      var price = product.price;
      cart.items.push({
        product: product,
        quantity: quantity,
        unitPrice: price
      });
      cart.save().then(function() {
        res.sendStatus(204);
      })
    })
    .then(null, next)
})




router.patch('/cart/:product/:qty', function(req, res, next) {
  var qty = +req.params.qty || 0;
  var cartId = lookupCart(req);
  if(qty<1) {

  }
})
