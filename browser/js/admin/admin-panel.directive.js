'use strict';

app.directive('admin-panel', function (CartFactory) {
    return {
        restrict: 'E',
        scope: {
            product: '='
        },
        
        templateUrl: '/js/admin/admin-panel.directive.html'
    };
});
