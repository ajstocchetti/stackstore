app.factory('AccountFactory', function($http) {
  return {
    myOrders: myOrders,
    me: getMe
  }

  function myOrders() {
    $http.get('/')
  }

  function getMe() {
    $http.get('/api/users/me')
    .then(function(resp) {
      return resp.data;
    })
  }
});
