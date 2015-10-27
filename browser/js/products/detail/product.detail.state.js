/**
 * Created by uzer-y on 10/24/15.
 */

/**
 * Created by uzer-y on 10/24/15.
 */


app.config(function ($stateProvider) {
    $stateProvider
        .state('productDetail', {
            url: '/products/:id',
            templateUrl: 'js/products/detail/product.detail.html',
            controller: function($scope, CartFactory, product){
                    $scope.product = product;
                    $scope.update = CartFactory.update;
                    $scope.QTY = 1;
            },
            resolve: {
                product: function(ProductList, $stateParams) {
                    return ProductList.getOne($stateParams.id)
                }
            }
        })
});
