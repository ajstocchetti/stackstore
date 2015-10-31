/**
 * Created by uzer-y on 10/24/15.
 */
/**
 * Created by uzer-y on 10/24/15.
 */
app.factory('ReviewsFactory', function ($http) {
    return {
        getAll: getAll,
        getOne: getOne,
        create: create
    };

    function getAll(productId) {
        return $http.get('/api/products/reviews/' + productId) //product ID
            .then(function (results) {
                return results.data;
            });
    }

    function getOne(productID, reviewID) {
        return $http.get('/api/products/reviews/' + productID + '/' + reviewID)
            .then(function (results) {
                return results.data;
            });

    }

    function create(productID, review) {
        var config = {
            stars: review.stars,
            body: review.body,
            author: review.author,
            date: Date.now()
        };

        console.log(config);

        return $http.post('/api/products/'+productID+'/reviews/', config )
            .then(function (results) {
                return results.data;
            });

    }



});
