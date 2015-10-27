var Order = mongoose.model('Order');
var stripe = require('stripe');
var router = require('express').Router()


router.post('/:orderId', function(req, res, next) {
  Order.findById(req.params.orderId)
  .then(function(order) {
    res.json(order)
  })
})


module.exports = router;