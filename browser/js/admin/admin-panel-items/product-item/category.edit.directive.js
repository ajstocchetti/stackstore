'use strict';

app.directive('categoryEdit', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/admin/admin-panel-items/product-item/category.edit.html',
        scope: {
            categories: '=',
            id: '='
        },
        controller: function($scope, $http) {
            $scope.deleteCategory = function(category,categories,id,angind) {
                if (confirm("Do you want to delete category?")) {
                    categories.splice(angind, 1);
                    var config = {};
                    config['category'] = categories;
                    return $http.put('/api/products/detail/' + id, config)
                        .then(function(results) {
                            $scope.categories = categories;
                        });
                }
            }

            $scope.addCategory= function(id){
                var newCategory = prompt("Please Enter a Category");
                if (!newCategory)
                    return;
                var config = $scope.categories;
                config.push(newCategory);
                console.log(config)
                return $http.put('/api/products/detail/' + id, config)
                    .then(function(results) {
                        $scope.categories=config;
                    });
            }
        }
    }
});
