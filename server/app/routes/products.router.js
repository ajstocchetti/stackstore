/**
 * Created by uzer-y on 10/22/15.
 */
'use strict';

var router = require('express').Router(),
         _ = require('lodash');

var Product = require('../../db/models/product');


router.param('productId', function(req, res, next, productId){
    Product.findById(productId).exec()
        .then(function (product) {
            if (!product) throw HttpError(404);
            req.product = product;
            req.productId = productId;
            next();
        })
        .then(null, next);
});

router.use('/:productId/reviews', require('./reviews.router'));

router.get('/', function (req, res, next) {
    console.log("in the router");
    Product.find({}).exec()
        .then(function (products) {
            res.json(products);
        })
        .then(null, next);
});

router.get('/category/:category', function(req, res, next){
    Product.find({category: req.params.category}).exec()
        .then(function(products){
            res.json(products);
        })
        .then(null, next)
});


router.post('/', function (req, res, next) {
    Product.create(req.body)
        .then(function (product) {
            res.json(product);
        })
        .then(null, next);
});

router.get('/detail/:productId', function (req, res, next) {
    console.log("hi");
    Product.findById(req.productId)
        .then(function (product) {
            console.log(product);
            res.json(product);
        })
        .then(null, next);
});

router.put('/detail/:productId', function (req, res, next) {
    _.extend(req.product, req.body);
    req.product.save()
        .then(function (product) {
            res.json(product);
        })
        .then(null, next);
});

router.put('/:productId/:operator/:quantity', function (req, res, next) {
    Product.findById(req.productId)
        .then(function (product) {
            product.updateInventory(req.params.operator, req.params.quantity)
            res.json(product);
        })
        .then(null, next);
});

router.delete('/:productId', function (req, res, next) {
    req.product.remove()
        .then(function () {
            res.status(204).end();
        })
        .then(null, next);
});




module.exports = router;
