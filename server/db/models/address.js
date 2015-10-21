'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  zip: {
    type: Number,
    min: 999,
    max: 99999
  }
});

mongoose.model('Address', schema);

module.exports = {
  address: schema
};
