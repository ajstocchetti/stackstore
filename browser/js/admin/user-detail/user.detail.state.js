'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('userDetail', {
		url: '/users/:id',
		templateUrl: 'js/admin/user-detail/user.detail.html',
		controller: 'UserDetailCtrl',
		resolve: {
			user: function(UserFactory, $stateParams){
				console.log($stateParams)
				return UserFactory.getUser($stateParams.id)
			},
			orders: function (UserFactory, $stateParams, Session) {
				// console.log("userDetail state trying to resolve orders");
				return UserFactory.getUsersOrders($stateParams.id);
			}

		}
	});
});