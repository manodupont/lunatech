import React, {Component} from "react";
import {fetchProducts} from "./actions/products";
import 'babel-polyfill';
import "./App.scss";
import store, {history} from "./store";
import {ConnectedRouter} from "connected-react-router";
import {Route, Switch} from "react-router-dom";
import Home from "./components/home";
import Provider from "react-redux/es/components/Provider";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // What collection are we talking about ?
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page') || 0;
    const pageSize = urlParams.get('pageSize') || 50;

    // Fetch the right collection to display.
    store.dispatch(fetchProducts(page, pageSize));
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={Home}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App;
