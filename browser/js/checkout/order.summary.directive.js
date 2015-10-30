app.directive('orderSummary', function() {
  return {
    restrict: 'E',
    scope: {
      order: '='
    },
    templateUrl: "/js/checkout/order.summary.html"
  }
})