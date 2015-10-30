app.directive('shippingForm', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: "/js/checkout/shipping.info.html",
    controller = "checkoutCtrl"
  }
})