app.factory('CheckoutFactory', function($http, $q, OrderFactory, AuthService) {
  return {
 
      initialize: function(id) {
        
        var order = OrderFactory.getOne(id);
       
        var user = AuthService.getLoggedInUser();

        return $q.all([order, user])
        .then(function(results) {
          var returnData = {
            order: results[0],
            user: results[1]
          }
          
          return returnData;
        }).catch(function(err) {
          console.log(err)
        })
      }

    }
})