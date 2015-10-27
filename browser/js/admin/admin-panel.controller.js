'use strict';


app.controller('adminPanelCtrl', function($scope, AdminFactory, users, orders) {
	
	$scope.users  = users;
	$scope.orders = orders;
    

});
