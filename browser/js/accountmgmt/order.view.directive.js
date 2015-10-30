app.directive('userOrderView', function() {
  return {
    restrict: 'E',
    templateUrl: '/js/accountmgmt/order.view.directive.html',
    scope: {
      order: "="
    }
  }
})
