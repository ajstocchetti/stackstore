var User = require('mongoose').model('User');
var router = require('express').Router();
var _ = require('lodash')
var chalk = require('chalk');

// Gotta be at least a user to get pass this...
router.use(function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send("Gotta be a user for that, B");
    }
});
// This find the user for whatever id is attached to these routes
// the user is stored in req.requestedUser
router.param('id', function (req, res, next, id) {
  User.findById(id).exec()
  .then(function (user) {
    if (!user) throw new Error(404);
    req.requestedUser = user;
    console.log("requested user is:", req.requestedUser)
    next();
  })
  .then(null, next);
});

// This middleware checks if the user MAKING the request is an admin 
// or the actual user
var hasUserAccess = function(req, res, next) {
  console.log("checking admin rights for", req.user)
  if (req.user._id == req.requestedUser._id || req.user.isAdmin) {
    next()
  }
  else {
    res.status(401).send('Gotta be an admin or a user for this')
  }
}

var hasAdminRights = function(req, res, next) {
  console.log("checking admin rights for", req.user);
  if (req.user.isAdmin) {
    next()
  } else {
    res.status.send('Need to be an admin to get here')
  } 
}


// find all users -- this is an admin route
router.get('/', hasAdminRights, function(req, res, next) {
  // if (!req.user.isAdmin) {
  //   throw new Error(401)
  //   next()
  // }
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
  console.log("getting a specifc user:", req.params.id);
  res.json(req.requestedUser);
})



// EDIT user - Can only edit username, email and addresses for now ...
// need to send addresses as an array
router.put('/:id', hasUserAccess, function(req, res, next) {
  console.log('updating a specifc user');
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

