app.factory('CartFactory', function($http) {

    var theCart = {};

    return {
    cart: theCart,
    initialize: initializeCart,
    addOne: addOne,
    update: updateCart,
    remove: removeFromCart
  };




  function initializeCart() {
    return $http.get('/api/order/current')
    .then(function(resp) {
      theCart = resp.data;
    })
  }

  function updateCart(productId, quantity) {
    var config = {
      product: productId,
      quantity: quantity
    }
    $http.post('/api/order/cart', config)
    .then(function(resp) {
      console.log(resp.data);
      theCart = resp.data;
    })
  };

  function addOne(productId) {
    var config = {
      product: productId,
      quantity: 1
    };
    updateCart(productId, 1);
  };

  function removeFromCart(productId) {
    var config = { product: productId };
    $http.delete('/api/order/cart', config)
    .then(function(resp) {
      theCart = resp.data;
    })
  };

});
