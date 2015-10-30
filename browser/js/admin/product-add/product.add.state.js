'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('productAdd', {
    url: '/product/add',
    templateUrl: '/js/admin/product-add/product.add.html',
    controller: 'ProductAddCtrl'
  });
});
