app.factory('AccountFactory', function($http, AuthService) {
  return {
    myOrders: myOrders,
    me: getMe
  }

  function myOrders() {
    return AuthService.getLoggedInUser()
    .then(function(user) {
      return $http.get('/api/users/user/orders/' + user._id)
      .then(function(resp) {
        console.log("here 2")
        return resp.body;
      })
    })
  }

  function getMe() {
    return $http.get('/api/users/me')
    .then(function(resp) {
      return resp.data;
    });
  }
});
