app.config(function($stateProvider) {
  $stateProvider
    .state('checkout', {
      url: "checkout/:id"
      // resolve: {
      //   order: function($stateParams, OrderFactory) {
      //     return Todo.getOne($stateParams.id)
      //   }
      // }
    })
})