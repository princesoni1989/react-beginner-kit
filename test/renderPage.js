import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import App from '../src/components/App';

function renderPage (store) {
  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

module.exports = renderPage;
