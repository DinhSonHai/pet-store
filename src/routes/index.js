const express = require('express');
const path = require('path');

const products = require('./api/products');

function route(app) {
  app.use('/api/products', products);
}

module.exports = route;