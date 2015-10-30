app.factory('PaymentFactory', function($http) {
  return {
    checkout: function(id, data){
      return $http.post('/api/checkout/' + id, data)
      .then(function(response){
        console.log(response);
      })
    }
  }
})