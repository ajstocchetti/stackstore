app.config(function($stateProvider) {
  $stateProvider
    .state('checkout', {
      url: "/checkout/:id",
      templateUrl: "/js/checkout/checkout.html",
      controller: 'checkoutCtrl',
      resolve: {

        orderData: function($stateParams, CheckoutFactory) {

          return CheckoutFactory.initialize($stateParams.id)
          .then(function(data) {
            if (data.user) {
              data.step = "address"
            } else {
              data.step = "confirm"
            }
            return data
          })
        }
      }
    })
})