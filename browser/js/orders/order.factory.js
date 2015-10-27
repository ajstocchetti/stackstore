app.factory('OrderFactory', function ($http) {
    return {
        getOne: getOrder
    };

    function getOrder(id) {
        return $http.get('/api/order/' + id)
        .then(function(response) {
            return response.data;
        })
    }




});
