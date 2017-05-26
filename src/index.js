/* eslint-disable no-console */
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/';
import App from './components/App';
import routes from './routes';

let store = configureStore(window.__INITIAL_STATE__);

let app = document.getElementById('app');
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider> , app);

