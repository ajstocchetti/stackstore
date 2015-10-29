'use strict';

app.directive('productItem', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/admin/admin-panel-items/product-item/product.item.html',
        scope: {
            product: '='
        },
        controller: function($scope, $http) {
            $scope.editProduct = function(id, key, value) {
                var config = {};
                config[key] = value;
                console.log(config);
                return $http.put('/api/products/detail/' + id, config)
                    .then(function (results) {
                        //console.log(results.data);
                    });
            }
        },
        resolve: function($scope){
            $scope.isArray = angular.isArray;
        }
    }
});
