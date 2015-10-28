'use strict';


app.factory('UserFactory', function($http) {

	var service = {
		getUsersOrders  : getUsersOrders,
		getUser: getUser
		// getUsersProducts: getUsersProducts,
		// getUsersReviews : getUsersReviews
	}


	return service;
	///////////////



	function getUsersOrders (id) {
		console.log("UserFactory trying to get this user's orders: ", id);
		return $http.get('/api/order/' + id )
			.then(function(orders){
				return orders.data;
			});
	};

	function getUser(id) {
		return $http.get('/api/users/' + id)
		.then(function(response) {
			return response.data;
		})
	}


});






