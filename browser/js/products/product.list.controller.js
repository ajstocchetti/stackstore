/**
 * Created by uzer-y on 10/24/15.
 */
app.controller('productListCtrl', function($scope, ProductList, products) {

    $scope.getProductsByCat = function(value){
        return ProductList.getCategory(value)
    };

    $scope.products = products;

    $scope.product = function(id) {
        return ProductList.getOne(id)
    };

});
