/*
** Redux Store
*/

import React from "react";
import {createStore} from "redux";
import {combineReducers, compose, applyMiddleware} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {autoRehydrate} from 'redux-persist';
import * as actionListener from '../actionlistener';

import products from "../reducers/products";

export const history = createBrowserHistory({
  basename: '/'
});

const middleware = [
  thunk,
  actionListener.middleware,
  routerMiddleware(history)
];

if (true) {
  /* eslint-disable global-require */

  const logger = createLogger({
    collapsed: true,
  });
  middleware.push(logger);
}

export default createStore(
  connectRouter(history)(combineReducers({
    products
  })),

  compose(
    applyMiddleware(...middleware),
    autoRehydrate()
  )
);
