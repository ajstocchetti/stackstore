app.factory('SignupFactory', function($http) {
  return {
    create: function(user) {
      var config = {
          email: user.email,
          password: user.password
      }

      return $http.post('/signup', config)
        .then(function(resp) {
          if(resp.status === 201) {
            return "valid";
          } else if(resp.status === 409) {
            return "Email already exists";
          } else {
            return "Error creating user";
          }
        })
        .catch(function(err) {
          return "Error creating user";
        })
    }
  }
})
