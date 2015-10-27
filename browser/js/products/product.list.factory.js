/**
 * Created by uzer-y on 10/24/15.
 */
app.factory('ProductList', function ($http) {
    return {
        getAll: getAll,
        getOne: getOne,
        getByCategory: getByCategory,
        products: []
    };

    function getOne(id) {
        return $http.get('/api/products/detail/' + id)
            .then(function (results) {
                console.log(results.data);
                return results.data;
            });
    }

    function getAll() {
        var self = this;
        console.log('got inside getAll');
        return $http.get('/api/products/')
            .then(function (results) {
                self.products = results.data;
                return results.data;
            });

    }

    function getByCategory(cat) {
        return $http.get('/api/products/category/' + cat)
            .then(function (results) {
                console.log(results.data);
                return results.data;
            });
    }




});
