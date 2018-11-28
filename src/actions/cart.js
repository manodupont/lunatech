/*
**	Actions Creators
*/

import * as types from './types';

function addToCart(product) {
  return {
    type: types.ADD_TO_CART,
    product: product
  }
}
/* async */

export function addToCart(product) {
  return (dispatch) => {
    dispatch(addToCart(product));
    // api.getProducts(page, pageSize)
    //   .then((response) => {
    //     dispatch(receiveProducts(response));
    //   });
  }
}
