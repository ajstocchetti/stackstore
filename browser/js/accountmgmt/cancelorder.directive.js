app.directive('cancelOrder', function (OrderFactory) {
	return {
		restrict: 'E',
		templateUrl: '/js/accountmgmt/cancelorder.directive.html',
		scope: {
			order: '='
		},
		link: function(scope, element, attr) {
			scope.cancel = function(id) {
				// console.log(id)
				OrderFactory.cancelOrder(id);
			};
		}
	}
});
