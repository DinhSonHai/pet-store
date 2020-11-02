const express = require('express');
const path = require('path');

const products = require('./api/products');
const types = require('./api/types');
const categories = require('./api/categories');
const auth = require('./api/auth');
const cart = require('./api/cart');

function route(app) {
  //Products route
  app.use('/api/products', products);

  //Types route
  app.use('/api/types', types);

  //Categories route
  app.use('/api/categories', categories);

  //Auth route
  app.use('/api/auth', auth);

  //Cart route
  app.use('/api/cart', cart);
}

module.exports = route;