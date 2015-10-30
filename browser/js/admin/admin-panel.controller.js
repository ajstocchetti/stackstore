'use strict';


app.controller('adminPanelCtrl', function($scope, AdminFactory, users, orders, showDetails, products, $http) {

    $scope.users  = users;
    $scope.orders = orders;
    $scope.showDetails = showDetails;
    $scope.products = products;
    $scope.eEditable= -1;
    $scope.catEdit = false;
    $scope.photoEdit = false

    $scope.categoryManagement = function(name){
        $scope.catEdit == name ? $scope.catEdit = false : $scope.catEdit = name;
    };
    $scope.photoManagement = function(name){
        $scope.photoEdit == name ? $scope.photoEdit = false : $scope.photoEdit = name;
    };

    $scope.deleteProduct = function(product, $window) {
        if (confirm("Are you sure?")) {
            var id = product._id;
            return $http.delete('/api/products/' + id)
                .then(function (results) {
                    $scope.products.splice($scope.products.indexOf(product), 1);
                    console.log("Item deleted")
                })
        }

    }

    $scope.addCategory= function(product){
        var newCategory = prompt("Please Enter a Category");
        var config = {};
        config['category'] = [newCategory];
        console.log(config);
        return $http.put('/api/products/detail/' + product._id, config)
            .then(function(results) {
                console.log(results);
                product.category = [newCategory]
            });
    }








});
