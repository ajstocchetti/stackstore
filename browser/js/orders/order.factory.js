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
      console.log("Cancelling order");
      console.log(id);
    }


});
