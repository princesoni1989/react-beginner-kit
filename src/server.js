'use strict';

require('dotenv').config();
import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './util/logger';
import { port } from './config';
import jade from 'jade';
import assets from './assets';
import {login, signUp, listUsers} from './api';
import authenticate from './auth';
import cookie from 'react-cookie';

// React And Redux Setup
import configureStore from './store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import { fetchComponentData } from './util/fetchData';

const server = global.server = express();
let morgan = require('morgan');
morgan.token('remote-addr', (req, res) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public'), { maxAge: 3600000 }));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());
//
// Only use morgan logger in production
// -----------------------------------------------------------------------------
if (process.env.NODE_ENV === 'production') {
  server.use(morgan('combined'));
}

server.post('/api/login', login);
server.post('/api/signup', signUp);
server.get('/api/users', authenticate, listUsers);

server.get('/health-check', (req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  res.status(200);
  res.send(`All Good <br /> ${new Date()}`);
});

server.get('*', (req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    const template = jade.compile(require('./view/index.jade.js'));
    const data = {
      title: 'React Boiler Plate',
      description: 'React Boiler Plate Application',
      entry: assets.index.js,
      stylesheet: assets.index.css,
    };

    if (err) {
      data.error = 'Url Not Found';
      return res.status(500).end(template(data));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore();

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        cookie.plugToRequest(req, res);
        const initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = store.getState();
        data.body = initialView;
        data.initialState = JSON.stringify(finalState);
        res.status(200);
        res.send(template(data));
      })
      .catch((error) => next(error));
  });
});

//
// Error handling
// -----------------------------------------------------------------------------
// 404 - when nothing handles this request (without error)
server.use((req, res) => {
  res.status(404);
  res.send('404');
});

// Other Server Errors
server.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  logger.error(error);
  const statusCode = error.status || 500;
  res.status(statusCode);
  res.send('500');
});

server.listen(port, () => {
  logger.info(`The server is running at http://localhost:${port}/ in ${process.env.NODE_ENV} mode`);
});
