app.controller('OrderDetailCtrl', function ($scope, order, AdminFactory) {
  $scope.order = order;

  $scope.updateOrder = function(status) {
    console.log(status)
    var obj = {
      orderStatus: status
    }
    AdminFactory.updateOrderStatus(order._id, obj)
    .then(function(order) {
      $scope.order = order;
    })
  }
})