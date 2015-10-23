var User = require('mongoose').model('User');
var router = require('express').Router();
var _ = require('lodash')


// This find the user for whatever id is attached to these routes
// the user is stored in req.requestedUser
router.param('id', function (req, res, next, id) {
  User.findById(id).exec()
  .then(function (user) {
    if (!user) throw new Error(404);
    req.requestedUser = user;
    next();
  })
  .then(null, next);
});

// THis middleware checks if the user MAKING the request is an admin 
// or the actual user
var hasUserAccess = function(req, res, next) {
  console.log(req.user, req.params.id)
  if (req.user._id == req.requestedUser._id || req.user.isAdmin) {
    next()
  }
  else {
    res.status(401).send('Womp Womp, you cant get in :P')
  }
}

// find all users -- this is an admin route
router.get('/', function(req, res, next) {
  if (!req.user.isAdmin) {
    throw new Error(401)
    next()
  }
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
  console.log('in there');
  res.json(req.requestedUser);
})



// EDIT user - Can only edit username, email and addresses for now ...
// need to send addresses as an array
router.put('/:id', hasUserAccess, function(req, res, next) {
  delete req.body.isAdmin;
  // for (var prop in req.body) {
  //   if (req.requestedUser[prop]) {
  //     req.requestedUser[prop] = req.body[prop];
  //   }
  // }
  _.extend(req.requestedUser, req.body);
  return req.requestedUser.save()
    .then(function(user) {
    res.json(user)
  })
  .then(null, next)

})

router.delete('/:id', hasUserAccess, function(req, res, next) {
  
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
router.put('/makeAdmin/:id', function(req, res, next) {
  if (!req.user.isAdmin) {
    throw new Error(401)
    next()
  }
  req.requestedUser.isAdmin = true;
  return req.requestedUser.save()
  .then(function(user) {
    res.json(user);
  })
})




module.exports = router;

