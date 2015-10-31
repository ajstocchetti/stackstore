var Order = require('mongoose').model('Order');
var stripeKey = require('../../../config').STRIPE.apiKey;
var stripe = require('stripe')(stripeKey);
var router = require('express').Router();
var _ = require('lodash');

router.post('/:id', function(req, res, next) {

  Order.findById(req.params.id)
  .then(function(order) {

    checkout(order, req.body.stripeToken)
    .then(function(result) {
      var updatedOrder = updateOrder(order, req)
      return updatedOrder.save()
    })
    .then(function(savedOrder) {
      console.log(savedOrder);
      res.json(savedOrder);
    })
    .then(null, function(err) {
      if (err.type === 'StripeCardError') {
        console.log(err.message)
        res.status(404).json(err.message)
      } else {
        console.log(err, err.type, err.message)
        res.status(400).json(err.message)
      }
    })
  })

})

module.exports = router;

function checkout(order, userToken) {
  console.log('in checkout')
  return stripe.charges.create({
    source: userToken,
    amount: order.total,
    currency: "usd",
    description: order.toString()._id
  })
}


function updateOrder(order, req) {
  order.shipping.address.push(req.body.shippingAddress);
  order.billing.address.push(req.body.billingAddress);
  order.billing.last4 = req.body.last4;
  order.billing.expMonth = req.body.expMonth;
  order.billing.expYear = req.body.expYear;
  order.status = 'created'
  return order
}

