import 'babel-polyfill';
import React from "react";
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
console.log(process.env.VERSION);
console.log('NODE_ENV: ' + process.env.NODE_ENV);

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
registerServiceWorker();

