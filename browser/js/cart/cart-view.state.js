'use strict';

app.config(function ($stateProvider) {
    $stateProvider
        .state('cart', {
            url: '/cart',
            templateUrl: 'js/cart/cart-view.html',
            controller: 'cartCtrl',
            resolve: {
                cart : function(CartFactory){
                    return CartFactory.initialize();
                }
            }
        })
});
