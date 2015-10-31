app.config(function($stateProvider) {
  $stateProvider
    .state('checkout', {
      url: "/checkout/:id",
      templateUrl: "/js/checkout/checkout.html",
      controller: 'checkoutCtrl',
      resolve: {
        order: function($stateParams, OrderFactory) {
          // console.log($stateParams.id)
          return OrderFactory.getOne($stateParams.id);
        },
        step: function() {
          return 'confirm'
        },
        user: function(AuthService) {
          console.log("resolving user")
          return AuthService.getLoggedInUser().then(function(user) {
            return user;
          })
        }
      }
    })
})