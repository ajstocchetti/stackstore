app.factory('CheckoutFactory', function($http, $q, OrderFactory, AuthService) {
  return {
 
      initialize: function(id) {
        order = OrderFactory.getOne(id);
        user = AuthService.getLoggedInUser();
        return $q.all([order, user]).then(function(results) {
          returnData = {
            order: results[0],
            user: results[1]
          }
          if (user) {
            returnData.step = "address"
          } else {
            returnData.step = "confirm"
          }
          return returnData;
        })
      }
    }
  
})