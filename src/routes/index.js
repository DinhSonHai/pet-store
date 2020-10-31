const express = require('express');
const path = require('path');

const products = require('./api/products');
const types = require('./api/types');

function route(app) {
  //Products route
  app.use('/api/products', products);

  //Types route
  app.use('/api/types', types);
}

module.exports = route;