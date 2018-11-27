/*
**	Actions Creators
*/

import api from '../api';
import * as types from './types';

function requestProducts(page, pageSize) {
  return {
    type: types.REQUEST_PRODUCTS,
    page: page,
    pageSize: pageSize
  }
}

function receiveProducts(products) {
  return {
    type: types.RECEIVE_PRODUCTS,
    products: products
  }
}

/* async */

export function fetchProducts(page = 0, pageSize = 50) {
  return (dispatch) => {
    dispatch(requestProducts(page, pageSize));

    api.getProducts(page, pageSize)
      .then((response) => {
        dispatch(receiveProducts(response));
      });
  }
}
