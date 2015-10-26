/**
 * Created by uzer-y on 10/24/15.
 */

app.controller('reviewsListCtrl', function($scope, ProductList, ReviewsFactory, product ) {
    $scope.product = product;
    //$scope.product = function(id) {
    //    return ProductList.getOne(id)
    //};

    $scope.reviews = ReviewsFactory.getAll($scope.product._id);

});
