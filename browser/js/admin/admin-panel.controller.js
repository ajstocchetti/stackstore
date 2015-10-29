'use strict';


app.controller('adminPanelCtrl', function($scope, AdminFactory, users, orders, showDetails, products, $http) {

    $scope.users  = users;
    $scope.orders = orders;
    $scope.showDetails = showDetails;
    $scope.products = products;
    $scope.eEditable= -1;

    $scope.deleteProduct = function(product) {
        var id = product._id;
        return $http.delete('/api/products/' + id)
            .then(function (results) {
                $scope.products.splice($scope.products.indexOf(product), 1);
                console.log("Item deleted")
            })
    }








});
