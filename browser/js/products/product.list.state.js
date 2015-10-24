/**
 * Created by uzer-y on 10/24/15.
 */


app.config(function ($stateProvider) {
    $stateProvider
        .state('productList', {
            url: '/products',
            templateUrl: 'js/products/product.list.html',
            controller: 'productListCtrl',
            resolve: {
                products: function(ProductList){
                        console.log('here I am');
                        return ProductList.getAll()
                }
            }
        })
});
