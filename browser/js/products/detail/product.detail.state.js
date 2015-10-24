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
            controller: 'productDetailCtrl',
            resolve: {
                product: function(ProductList, $stateParams ) {
                    return ProductList.getOne($stateParams.id)
                }
            }
        })
});
