app.directive('cancelOrder', function () {
	return {
		restrict: 'E',
		templateUrl: '/js/accountmgmt/cancelorder.directive.html',
		scope: {
			order: '='
		}
	}
});
