app.directive('cancelOrder', ['OrderFactory', function () {
	return {
		restrict: 'E',
		templateUrl: '/js/accountmgmt/cancelorder.directive.html',
		scope: {
			order: '='
			// zcancel: OrderFactory.cancelOrder
		},
		link: function(scope, element, attr) {
			// scope.cancel = OrderFactory.cancelOrder
			scope.cancel = function(id) {
				alert(id)
				OrderFactory.cancelOrder;
			};
			scope.zcancel = function() {
				OrderFactory.cancelOrder;
			}
		}
	}
}]);
