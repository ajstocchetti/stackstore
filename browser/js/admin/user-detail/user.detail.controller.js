app.controller('UserDetailCtrl', function($scope, UserFactory, orders, user){
	$scope.orders = orders;
  $scope.user = user;
});