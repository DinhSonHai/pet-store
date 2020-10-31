const express = require('express');
const path = require('path');

const products = require('./api/products');
const types = require('./api/types');
const categories = require('./api/categories');

function route(app) {
  //Products route
  app.use('/api/products', products);

  //Types route
  app.use('/api/types', types);

  //Categories route
  app.use('/api/categories', categories);
}

module.exports = route;