app.directive('cancelOrder', ['OrderFactory', function () {
	return {
		restrict: 'E',
		templateUrl: '/js/accountmgmt/cancelorder.directive.html',
		// scope: {
		// 	order: '='
		// },
		link: function(scope, element, attr) {
			scope.cancel = OrderFactory.cancelOrder
		}
	}
}]);
