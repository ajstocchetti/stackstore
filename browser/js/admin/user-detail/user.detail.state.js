'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('userDetail', {
		url: '/users/:id',
		templateUrl: '/js/user/user.detail.html',
		controller: 'UserDetailCtrl',
		resolve: {
			orders: function (UserFactory, $stateParams) {
				console.log("userDetail state trying to resolve orders");
				return UserFactory.getUsersOrders($stateParams.id);
			}
		}
	});
});