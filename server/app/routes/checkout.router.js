var Order = require('mongoose').model('Order');
var stripeKey = require('../../../config').STRIPE.apiKey;
var stripe = require('stripe')(stripeKey);
var router = require('express').Router()


router.get('/:id', function(req, res, next) {
  Order.findPopulatedOrder(req.params.id)
  .then(function(order) {

    // Add logic to store or retrieve saved tokens for users.

    makeCharge(order, req.body.stripeToken).then(function(result) {
      res.json(order, result);
      
      /* 
      store 'safe' card info from API response
      and relevant details, such as amount, expiration year, last 4 digits
      and billing address
      */

    })
    .then(null, function(err) {
      if (err.type === 'StripeCardError') {
        res.status(404).json(err.message)
      } else {
        res.status(400).json(err)
      }
    })

  })
  .then(null, next);
})


module.exports = router;

function makeCharge(order, userToken) {
  return stripe.charges.create({
    source: userToken,
    amount: order.totalPrice,
    description: order._id
  })
}