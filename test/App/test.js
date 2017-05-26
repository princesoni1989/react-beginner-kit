/**
 * Created by ttnd on 3/1/17.
 */
import React from 'react';
import {expect} from 'chai';
import configureStore from '../../src/store/';
import renderPage from '../renderPage';

describe('Notification Tab', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store);
  });
  it('Should render Counter Component', function () {
    expect(this.page.find('Counter').length).eq(1);
  });
});
