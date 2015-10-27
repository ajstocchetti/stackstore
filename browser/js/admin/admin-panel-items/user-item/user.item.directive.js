'use strict';

app.directive('userItem', function () {
	return {
		restrict: 'E',
		templateUrl: 'js/admin/admin-panel-items/user-item/user.item.html',
		scope: {
			user: '=',
		}
	}
});