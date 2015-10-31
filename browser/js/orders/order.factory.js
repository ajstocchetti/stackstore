app.factory('OrderFactory', function ($http) {
    return {
        getOne: getOrder,
        cancelOrder: cancelOrder
    };

    function getOrder(id) {
        return $http.get('/api/order/' + id)
        .then(function(response) {
            return response.data;
        })
    }

    function cancelOrder(id) {
      // id = JSON.stringify(id)
      var config = {
        orderStatus: "cancelled"
      };
      $http.put('/api/order/'+id, config)
      .then(function(resp) {
        return resp.data;
      })
    }


});
