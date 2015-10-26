var User = require('mongoose').model('User');
var router = require('express').Router();
var _ = require('lodash')
var chalk = require('chalk');
var Promise = require('bluebird');


// Require access middleware functions
var accessMiddleware = require('./access.middleware'),
    hasAdminRights = accessMiddleware.hasAdminRights,
    hasUserAccess = accessMiddleware.hasUserAccess,
    isAuthenticated = accessMiddleware.isAuthenticated;

// Only authenticated users can get past this
router.use(isAuthenticated);



// Find requested user by id and store as req.requested user
router.param('id', function (req, res, next, id) {
  console.log(id);
  User.findById(id).select('+passwordResetTriggered').exec()
  .then(function (user) {
    if (!user) throw new Error(404);
    req.requestedUser = user;
    console.log("requested user is:", req.requestedUser.email)
    next();
  })
  .then(null, next);
});


router.get('/', hasAdminRights, function(req, res, next) {
  User.find({ 
    isAdmin: false
  })
  .then(function(users) {
    res.json(users)
  })
  .then(null, next)
})

router.get('/me', function(req, res, next) {
  console.log("me");
  res.json(req.user);
})

// Get user profile - right now you can only view your own unless admin
router.get('/:id', hasUserAccess, function(req, res, next) {
  console.log("getting a specifc user:", req.params.id, req.user.email);
  var reviewPromise = req.requestedUser.getReviews();
  var orderPromise = req.requestedUser.getOrders();
  
  Promise.join(reviewPromise, orderPromise, function(orders, reviews) {
    console.log('promise settled')
    console.log(orders, reviews);
    var userObj = req.requestedUser.toObject()
    userObj.orders = orders;
    userObj.reviews = reviews;
    console.log(userObj);
    res.json(userObj);
  })
  .then(null, next);

})



// EDIT user - Can only edit username, email and addresses for now ...
// Note: Need to send addresses as an array to update
router.put('/:id', hasUserAccess, function(req, res, next) {
  console.log('updating a specifc user:', req.params.id, req.user.email);
  delete req.body.passwordResetTriggered;
  delete req.body.isAdmin;
  _.extend(req.requestedUser, req.body);
  req.requestedUser.save() // do i need to return here?
  .then(function(user) {
    res.status(204).json(user)
  })
  .then(null, next)

})

router.delete('/:id', hasUserAccess, function(req, res, next) {
  req.requestedUser.remove()
  .then(function() {
    res.sendStatus(204)
  })
  .then(null, next)
})


// GET User's products...not sure if we need this
router.get('/products/:id', hasUserAccess, function(req, res, next) {
  User.findOne({ _id: req.requestedUser._id})
  .populate('productsPurchased').exec()
  .then(function(user) {
    res.json(user);
  })
  .then(null, next)
})


// Users and Admins can view prior orders
router.get('/user/orders/:id', hasUserAccess, function(req, res, next) {
  req.requestedUser.getOrders()
  .then(function(orders) {
    res.json(orders)
  })
})



/*
    ADMIN ONLY ROUTES
*/


// ADMIN route to make other admins!!!
router.put('/admin/makeAdmin/:id', hasAdminRights, function(req, res, next) {
  req.requestedUser.isAdmin = true;
  req.requestedUser.save()
  .then(function(user) {
    res.json(user);
  })
})

// Admin route to trigger password reser for a user
router.put('/admin/reset/:id', hasAdminRights, function(req, res, next) {
  console.log("triggering password reset")
  req.requestedUser.passwordResetTriggered = true;
  req.requestedUser.save()
  .then(function(user) {
    res.status(200).json("password reset");
  })

})

module.exports = router;

