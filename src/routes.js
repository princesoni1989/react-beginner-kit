/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Landing from './components/Landing';
import Login from './components/Authentication/Login/';
import SignUp from './components/Authentication/SignUp';
import Users from './components/Users';
import cookie from 'react-cookie';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule (deps, callback) {
    callback(require);
  };
}

function redirectIfLoggedIn (nextState, replace, callback) {
  let token = cookie.load('token')
  if (token) {
    replace('/users')
  }
  callback()
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path='/' component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, Landing);
        });
      }}
    />
    <Route
      path='/login'
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, Login);
        });
      }}
      onEnter={redirectIfLoggedIn}
    />
    <Route
      path='/signup'
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, SignUp);
        });
      }}
      onEnter={redirectIfLoggedIn}
    />
    <Route
      path='/users'
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, Users);
        });
      }}
    />
  </Route>
);
