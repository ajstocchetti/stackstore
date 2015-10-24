/**
 * Created by uzer-y on 10/24/15.
 */
app.factory('ProductList', function ($http) {
    return {
        getAll: getAll,
        getOne: getOne,
        getCategory: getCategory,
    };

    function getOne(id) {
        return $http.get('/api/products/detail/' + id)
            .then(function (results) {
                console.log(results.data);
                return results.data;
            });
    }

    function getAll() {
        console.log('got inside getAll');
        return $http.get('/api/products/')
            .then(function (results) {
                return results.data;
            });

    }

    function getCategory(cat) {
        return $http.get('/api/products/' + cat)
            .then(function (results) {
                console.log(results.data);
                return results.data;
            });
    }



});
