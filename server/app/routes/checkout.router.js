var Order = require('mongoose').model('Order');
var stripeKey = require('../../../config').STRIPE.apiKey;
var stripe = require('stripe')(stripeKey);
var router = require('express').Router()

router.post('/:id', function(req, res, next) {
  // console.log(req.body.id);
  
  Order.findOne(req.params.id)
  .then(function(order) {
    // console.log(order)
    checkout(order, req.body.id).then(function(result) {
       console.log("hello?")
      res.json(result);
     
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
    amount: 3000,
    currency: "usd",
    description: order.toString()._id
  })
}