/**
 * Created by uzer-y on 10/24/15.
 */
app.controller('productDetailCtrl', function($scope, ProductList, product, CartFactory){

    $scope.update = CartFactory.update(id, qty);

    $scope.product = product;
});
