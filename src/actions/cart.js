/*
**	Actions Creators
*/

import * as types from './types';

function requestAddToCart(product) {
  return {
    type: types.ADD_TO_CART,
    product: product
  }
}

function requestRemoveFromCart(id) {
  return {
    type: types.REMOVE_FROM_CART,
    id: id
  }
}


export function addToCart(product) {
  return (dispatch) => {
    dispatch(requestAddToCart(product));
  }
}

export function removeFromCart(id) {
  return (dispatch) => {
    dispatch(requestRemoveFromCart(id));
  }
}
