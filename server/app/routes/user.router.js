var User = require('mongoose').model('User');
var router = require('express').Router();
var _ = require('lodash')
var chalk = require('chalk');

// Require access middleware functions
var accessMiddleware = require('./access.middleware'),
    hasAdminRights = accessMiddleware.hasAdminRights,
    hasUserAccess = accessMiddleware.hasAdminRights,
    isAuthenticated = accessMiddleware.isAuthenticated;

// Only authenticated users can get past this
router.use(isAuthenticated);

// Find requested user by id and store as req.requested user
router.param('id', function (req, res, next, id) {
  User.findById(id).exec()
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


// Get user profile - right now you can only view your own unless admin
router.get('/:id', hasUserAccess, function(req, res, next) {
  console.log("getting a specifc user:", req.params.id, req.user.email);
  res.json(req.requestedUser);
})



// EDIT user - Can only edit username, email and addresses for now ...
// Note: Need to send addresses as an array to update
router.put('/:id', hasUserAccess, function(req, res, next) {
  console.log('updating a specifc user:', req.params.id, req.user.email);
  
  delete req.body.isAdmin;
  _.extend(req.requestedUser, req.body);
  req.requestedUser.save()
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

// ADMIN route to make other admins!!!
router.put('/makeAdmin/:id', hasAdminRights, function(req, res, next) {
  req.requestedUser.isAdmin = true;
  return req.requestedUser.save()
  .then(function(user) {
    res.status(204).json(user);
  })
})

// Users and Admins can view prior orders
router.get('/user/orders/:id', hasUserAccess, function(req, res, next) {
  req.requestedUser.getOrders()
  .then(function(orders) {
    res.json(orders)
  })
})



module.exports = router;

