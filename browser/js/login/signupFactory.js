app.factory('SignupFactory', function($http) {
  return {
    create: function(user) {
      var config = {
          email: user.email,
          password: user.password
      }
      // any status code not in the 200s is counted as and error and drops to the catch
      return $http.post('/signup', config)
        .then(function(resp) {
          if(resp.status === 201) {
            return "valid";
          }
        })
        .catch(function(err) {
          console.log(err);
          if (err.status === 409) {
            return "Email already exists";
          }
          return "Error creating user";
        })
    }
  }
})
