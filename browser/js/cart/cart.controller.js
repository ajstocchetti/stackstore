app.controller('cartCtrl', function($scope, CartFactory, cart ) {
	$scope.cart = cart;
	// $scope.cart = cart;
	console.log('$scope.cart',$scope.cart);
	// CartFactory.initialize();

	$scope.addToCart = function(prod){
		return CartFactory.addOne(prod);
  	}; 
  	

	$scope.update = function(prod, qty){
		return CartFactory.update(prod, qty);
	};

	$scope.remove = function(prod){
		return CartFactory.remove(prod);
	};

});
