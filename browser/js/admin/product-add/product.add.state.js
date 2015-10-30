'use strict';

app.config(function ($stateProvider) {
  $stateProvider
      .state('product-add', {
        url: '/admin-panel/product/add',
        templateUrl: '/js/admin/product-add/product.add.html',
        controller: 'ProductAddCtrl',
        resolve: {
              users: function (AdminFactory) {
                  return AdminFactory.getAllUsers()
              }
          }
      });
});

