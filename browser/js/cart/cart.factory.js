app.factory('CartFactory', function($http, $state) {

    var theCart = {};

    return {
    cart       : theCart,
    initialize : initializeCart,
    addOne     : addOne,
    update     : updateCart,
    remove     : removeFromCart,
    merge      : mergeCartOnLogin
  };

  function initializeCart() {
    return $http.get('/api/order/current')
    .then(function(resp) {
      theCart = resp.data;
      return resp.data;
    })
  }

  function updateCart(productId, quantity) {
    console.log("CartFactory update: ", "productId:", productId, "quantity: ", quantity);
    var config = {
      product: productId,
      quantity: quantity
    }
    return $http.post('/api/order/cart', config)
    .then(function(resp) {
      theCart = resp.data;
      return theCart
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
    console.log('CartFactory removeFromCart', productId);
    return $http.delete('/api/order/cart/' + productId)
    .then(function(resp) {
      theCart = resp.data;
      return theCart
    })
  };

  function mergeCartOnLogin() {
    $http.get('/api/order/cart/merge')
    .then(function(resp) {
      theCart = resp.data;
    })
  }

});
