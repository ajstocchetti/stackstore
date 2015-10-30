'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));

router.use('/products', require('./products.router'));

router.use('/order', require('./orders.router.js'));

router.use('/users', require('./user.router'));

router.use('/checkout', require('./checkout.router'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
