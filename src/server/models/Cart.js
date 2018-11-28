'use strict';

const mongoose      = require('mongoose');

const schema = new mongoose.Schema({
  products: [{type: mongoose.Schema.ObjectId, ref: 'Product'}],
});

module.exports = mongoose.model('Cart', schema);
