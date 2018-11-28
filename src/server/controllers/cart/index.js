const mongoose = require('mongoose');
const Cart = require('../../models/Cart');

exports.addProduct = function (productId) {
  return new Promise((resolve, reject) => {
    new Cart(productId).save((err, product) => {
      if (err) {
        reject(err);
      }
      resolve(product);
    });
  });
};
