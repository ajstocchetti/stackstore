'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('user', {
		url: '/users/:id',
		templateUrl: '/js/user/user.detail.html',
		controller: 'UserDetailCtrl',
		resolve: {
			orders: function (UserFactory, $stateParams) {
				// return UserFactory.getUserOrders($stateParams.id)
				return {"foo":"bar"}
			}
		}
	});
});