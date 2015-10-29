'use strict';


app.controller('adminPanelCtrl', function($scope, AdminFactory, users, orders, showDetails, products) {

	$scope.users  = users;
	$scope.orders = orders;
    $scope.showDetails = showDetails;
    $scope.products = products;
    $scope.eEditable= -1;






});
