/**
 * Created by uzer-y on 10/26/15.
 */
/**
 * Created by uzer-y on 10/24/15.
 */

app.directive('starRatings', function () {
    return {
        restrict: 'EA',
        templateUrl: '/js/reviews/ratings/ratings.directive.html',
        scope: {
            product: '=',
            readonly: '='
        },
        link: function(scope, element, attributes){
            function updateStars() {
                scope.stars = [];
                scope.max = 5;
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push(
                        {
                            filled: i < scope.product.ratings
                        });
                }
            }
            //scope.toggle = function(index) {
            //    if (scope.readonly == undefined || scope.readonly === false){
            //        scope.product.ratings = index + 1;
            //        scope.onRatingsSelect({
            //            rating: index+1
            //        });
            //    }
            //};
            scope.$watch('product.ratings', function(oldValue, newValue){
                if (newValue) {
                    console.log("yo");
                    updateStars()
                }
            });
        }
    };
});
