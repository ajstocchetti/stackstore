app.config(function($stateProvider) {

  $stateProvider.state('editReview', {
    url: '/:id/reviews/edit',
    templateUrl: 'js/reviews/edit/review.edit.html',
    resolve: {
        product: function(ProductList, $stateParams ) {
            return ProductList.getOne($stateParams.id)
        }
    },
    controller: function($scope, product) {
      $scope.product = product;
    }
  })
})
