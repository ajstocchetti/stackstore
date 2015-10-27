'use strict';


app.factory('AdminFactory', function( $http ) {
	
	var service =  {
		getAllUsers   : getAllUsers
		// gettAllOrders : gettAllOrders
	};

	
	//////////////////////////////

	return service;

	function getAllUsers () {
		return $http.get('/api/users/')
			.then(function(users){
				return users.data;
			});
	};

	// function getAllOrders () {
	// 	return $http.get('api/orders/')
	// 		.then(function(order){
	// 			return order.data;
	// 		})
	// };


});