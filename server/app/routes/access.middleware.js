module.exports = {

  // Check if user making the request is logged in
  isAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send("Gotta be logged in for that");
    }
  },

  /*
    !! ONLY USE IF YOU SET UP A req.requestedUser !!
    You can only access your own user info unless an admin
  */
  hasUserAccess: function(req, res, next) {
    console.log("checking user access rights for me:", req.user.email)
    if (req.user._id == req.requestedUser._id || req.user.isAdmin) {
      next()
    }
    else {
      res.status(401).send('Gotta be an admin or a user for this')
    }
  },

  // Only admins can get past this
  hasAdminRights: function(req, res, next) {
    console.log("checking admin rights for me:", req.user.email);
    if (req.user.isAdmin) {
      next()
    } else {
      res.status(401).send('Need to be an admin to get here')
    } 
  }

}

