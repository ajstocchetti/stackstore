'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('orderDetail', {
    url: '/orders/:id',
    templateUrl: '/js/admin/order-detail/order.detail.html',
    controller: 'OrderDetailCtrl',
    resolve: {
      order: function (OrderFactory, $stateParams) {
        console.log("userDetail state trying to resolve orders");
        return OrderFactory.getOne($stateParams.id);
      }
    }
  });
});