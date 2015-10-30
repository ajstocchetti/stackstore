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

  $scope.copyShipping = function() {
    $scope.billingAddress = _.clone($scope.shippingAddress);
  }

  $scope.confirmAddress = function() {
    $scope.step = "payment"
  }

  $scope.stripeCallback = function (code, result) {
    if (result.error) {
      window.alert('it failed! error: ' + result.error.message);
    } else {
      window.alert('success! token: ' + result.id);
    }
  };

})