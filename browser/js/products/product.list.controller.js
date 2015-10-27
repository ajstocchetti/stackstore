/**
 * Created by uzer-y on 10/24/15.
 */
app.controller('productListCtrl', function($scope, ProductList, products) {

    $scope.getProductsByCat = function(value){
        return ProductList.getCategory(value)
    };

    $scope.products = products;

    $scope.product = function(id) {
        return ProductList.getOne(id)
    };

    $scope.categories = function(){
        console.log('heynow')
        var arr = [];
        $scope.products.forEach(function(product){
            product.category.forEach(function(category){
                if ( arr.indexOf(category) == -1){
                    arr.push(category)
                }
            })
        });
        return arr
    }();

    $scope.activeCat = null;

    $scope.filterByCategory = function (cat) {
        $scope.activeCat = cat;
        $scope.products = null;
        ProductList.getByCategory(cat)
            .then(function (items) {
                console.log(items);
                $scope.products = items;
            });
    };

});
