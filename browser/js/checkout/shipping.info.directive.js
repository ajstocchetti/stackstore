app.directive('shippingForm', function() {
  return {
    restrict: 'E',
    scope: {
      order: '='
    },
    templateUrl: "/js/checkout/shipping.info.html"
  }
})