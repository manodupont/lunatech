'use strict';

const mongoose      = require('mongoose');

const schema = new mongoose.Schema({
  ean: {type: String},
  name: {type: String},
  description: {type: String},
  price: {type: Number},
  assembled: {type: Boolean},
  weight: {type: Number},
  dimension: {
    width: {type: Number},height: {type: Number},depth: {type: Number}
  }
});

module.exports = mongoose.model('Product', schema);
