/**
 * Created by uzer-y on 10/24/15.
 */
app.directive('productList', function () {
    return {
        restrict: 'E',
        scope: {
            product: '='
        },
        templateUrl: '/js/products/product.list.directive.html'
    };
});
