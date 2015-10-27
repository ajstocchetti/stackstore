app.controller('cartCtrl', function($scope, CartFactory ) {
  $scope.cart = CartFactory.cart;
  CartFactory.initialize();

  $scope.addToCart = CartFactory.addOne(prod);

  $scope.update = CartFactory.update(prod, qty);

  $scope.remove = CartFactory.remove(prod);

});
