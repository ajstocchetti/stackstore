'use strict';

app.directive('cartItem', function () {
    return {
        restrict: 'E',
        templateUrl: '/js/cart/cart-item/cart-item.html',
        scope: {
            order: '='
        }
    }
});
