/**
 * Created by uzer-y on 10/26/15.
 */

app.config(function ($stateProvider) {
    $stateProvider
        .state('reviewsList', {
            url: '/:id/reviews',
            templateUrl: 'js/reviews/reviews.html',
            controller: 'productDetailCtrl',
            resolve: {
                product: function(ProductList, $stateParams ) {
                    return ProductList.getOne($stateParams.id)
                }
            }
        })
});
