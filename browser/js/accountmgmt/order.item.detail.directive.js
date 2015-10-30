app.directive('orderItemDetail', function() {
  return {
    restrict: 'E',
    templateUrl: '/js/accountmgmt/order.item.detail.directive.html',
    scope: {
      item: '='
    }
  }
})
