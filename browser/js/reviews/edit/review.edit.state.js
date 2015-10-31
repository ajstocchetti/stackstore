app.config(function($stateProvider) {

  $stateProvider.state('editReview', {
    url: '/:id/reviews/edit',
    templateUrl: 'js/reviews/edit/review.edit.html',
    resolve: {
      product: function(ProductList, $stateParams) {
        return ProductList.getOne($stateParams.id);
      },
      me: function(AccountFactory) {
        return AccountFactory.me();
      }
    },
    controller: function($scope, product, ReviewsFactory, me, $state) {
      $scope.product = product;
      $scope.userReview = {
        author: me._id,
        ratings: 3
      };
      $scope.save = function(review) {
        review.stars = review.ratings;
        return ReviewsFactory.create(product._id, review)
        .then(function() {
          $state.go("productDetail", { id: product._id })
        })
      };
      $scope.ratingUp = function() {
        if($scope.userReview.ratings < 5)
          $scope.userReview.ratings++;
      };
      $scope.ratingDown = function() {
        if($scope.userReview.ratings > 0)
          $scope.userReview.ratings--;
      };
    }
  });
});
