app.controller('OrderDetailCtrl', function ($scope, order, AdminFactory) {
  $scope.order = order;



  $scope.updateOrder = function(status) {
    console.log(status)
    var obj = {
      orderStatus: status,
      recipient  : $scope.order.email,
      shipTo     : $scope.order.shipping.address,
      items      : $scope.order.items
    }
    AdminFactory.updateOrderStatus(order._id, obj)
    .then(function(order) {
      $scope.order = order;
    })
  }
})