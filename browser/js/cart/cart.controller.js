app.controller('cartCtrl', function($scope, CartFactory, cart ) {
	$scope.cart = cart;

	$scope.addToCart = function(prod){
		return CartFactory.addOne(prod)

  	}; 
  	

	$scope.update = function(prod, qty){
		console.log('cartCtrl update, prod: ', prod, 'qty', qty);
		return CartFactory.update(prod, qty)
		.then(function(response){
			console.log(response);
			$scope.cart = response;
		})
	};

	$scope.remove = function(prod){
		console.log('cartCtrl remove prod', prod );
		return CartFactory.remove(prod)
		.then(function(response){
			$scope.cart = response;
		})
	};

});

