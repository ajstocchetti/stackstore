var chance = require('chance')(123),
    _ = require('lodash'),
    Promise = require('bluebird');

var mongoose = require('mongoose')

var db = require('./server/db');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Review = mongoose.model('Review');
var Order = mongoose.model('Order');

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};

var seedProducts = function() {
  var producs = [];

  return Product.createAsync(products);
}

var seedOrders = function() {
  var orders = [];
  return Order.createAsync(orders);
}

