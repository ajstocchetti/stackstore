'use strict';

app.directive('orderItem', function () {
	return {
		restrict: 'E',
		templateUrl: '/js/admin/admin-panel-items/order-item/order.item.html',
		scope: {
			order: '='
		}
	}
});
