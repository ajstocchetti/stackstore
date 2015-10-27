'use strict';


app.factory('UserFactory', function($http) {

	var service = {
		getUsersOrders  : getUsersOrders,
		getUsersProducts: getUsersProducts,
		getUsersReviews : getUsersReviews
	}


	return service;
	///////////////



	function getUsersOrders (id) {
		return $http.get('/api/orders/' + id )
			.then(function(orders){
				return orders.data;
			})
	};


});






