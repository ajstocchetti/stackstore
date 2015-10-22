/**
 * Created by uzer-y on 10/21/15.
 */
require('../../../server/db/models');
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var mongoose = require('mongoose');
var chai = require('chai');
var expect = require('chai').expect;
var Product = mongoose.model('Product');
//var db = require('../server/db/index');

describe('Product Statics', function() {
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);

        Product.create({
        name: "GNC Extra Whey",
        description: "Stuff described",
        category: ['protein', 'sports'],
        price: 20,
        inventory: 10
            });

        Product.create({
            name: "GNC Amino",
            description: "Stuff Amino described",
            category: ['sports'],
            price: 20,
            inventory: 8
        });

        Product.create({
            name: "GNC Multi-V",
            description: "Stuff multi-v described",
            category: ['nutrition'],
            price: 20
        })
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    describe('Statics', function() {
        describe('getByCategory', function() {
            xit('should return item in the correct category', function() {
                Product.getByCategory('sports').then(function(result){
                    expect(result[0].category).to.equal('sports')
                })
            });
            xit('should return all items in one category', function(){
                Product.getByCategory('sports').then(function(result){
                    expect(result.length).to.equal(2);
                })
            });
        })
    });

    describe('methods', function(){
        describe('updateInventory', function(){
            it('should subtract from inventory', function(){
                Product.findOne({name: 'GNC Extra Whey' }).then(function(product){
                 product.updateInventory('subtract', 2);
                 expect(product.inventory).to.equal(8)
                })
            })
            it('should add to inventory', function(){
                Product.findOne({name: 'GNC Amino' }).then(function(product){
                    product.updateInventory('add', 2);
                    expect(product.inventory).to.equal(10)
                })
            })
        });
        describe('addCategory', function(){
            it('should add category to product category array',function(){
                Product.findOne({name: 'GNC Extra Whey' }).then(function(product){
                    product.addCategory('powder');
                    expect(product.category.length).to.equal(3)
                })
            })
        })
    })
});
