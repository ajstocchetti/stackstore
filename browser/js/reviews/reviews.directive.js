/**
 * Created by uzer-y on 10/24/15.
 */

app.directive('reviewList', function () {
    return {
        restrict: 'E',
        scope: {
            review: '='
        },
        templateUrl: '/js/reviews/reviews.directive.html'
    };
});
