app.controller('cartCtrl', function($scope, CartFactory, cart ) {
	$scope.cart = cart;

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
