'use strict';

var router = require('express').Router();

var Promise = require('bluebird');
var Product = require('../../db/models/product');
var Review  = require('../../db/models/review');

//////
/*
need to put this line into the products router:
router.use('/:productId/reviews', require('./reviews.router'));

*/
/////


router
	
	.use(function(req, res, next){
		console.log('we have a product ID', req.productId);
		console.log('here is the req.user', req.user);
		next();
	})


	//get all reviews
	.get('/', function( req, res, next ){
		return Product.findById(req.productId)
			.then(function(product){
				res.json(product.reviews)
			})
			.catch(function(err){
				next(err)
		})
	})

	//get single review
	.get('/:reviewId', function(req, res, rext){
		Product.findOne({_id: req.productId})
		.then(function(product){
			var review = product.reviews.id(req.params.reviewId)
			return review
		})
		.then(function (review){
			res.json(review)
		})
		.catch(function(err){
				next(err)
		})
	})

	//add a new review
	.post('/', function(req, res, next){
		Product.findById(req.productId)
			.then(function(product){
				product.reviews.push(req.body)
				console.log('product',product);
				return product
			})
			.then(function(product){
				return product.save()
			})
			.then(function(product){
				res.json(product.reviews)
			})
			.catch(function(err){
				next(err)
			})
	})

	//edit a review | Needs Auth functionality
	.put('/:reviewId', function(req, res, next){
		var insertData = req.body
		Product.findById(req.productId)
		.then(function(product){
			var review = product.reviews.id(req.params.reviewId)
			for(var prop in insertData){
				console.log(prop);
				review[prop] = insertData[prop]
			}
			return product
		})
		.then(function(product){
				return product.save()
		})
		.then(function (product){
			res.json(product.reviews)
		})
		.catch(function(err){
				next(err)
		})
	})

	//delete a review | Needs Auth functionality
	.delete('/:reviewId', function(req, res, next){
		return Product.findOneAndUpdate
		( 
			{_id: req.productId},
			{$pull: {reviews: {_id: req.params.reviewId}}},
			{new: true}
		)
		.then(function(product){
			res.json(product.reviews)
		})
		.catch(function(err){
				next(err)
		})   
	})



module.exports = router;


/*





*/