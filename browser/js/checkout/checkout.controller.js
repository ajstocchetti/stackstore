app.controller('checkoutCtrl', function($scope, order, step, AuthService) {
  $scope.order = order;
  $scope.step = step;
  $scope.shippingAddress = {};
  $scope.billingAddress = {};

  $scope.isLoggedIn = function() {
    return AuthService.isAuthenticated();
  }

  $scope.confirmOrder = function() {
    $scope.step = "shipping";
  }


})