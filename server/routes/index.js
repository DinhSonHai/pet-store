const products = require('./api/products');
const types = require('./api/types');
const categories = require('./api/categories');
const auth = require('./api/auth');
const cart = require('./api/cart');
const orders = require('./api/orders');
const client = require('./api/client');
const receipts = require('./api/receipts');
const employee = require('./api/employee');
const review = require('./api/review');

function route(app) {
  //Products route
  app.use('/api/products', products);

  //Types route
  app.use('/api/types', types);

  //Categories route
  app.use('/api/categories', categories);

  //Auth route
  app.use('/api/auth', auth);

  // Employee route
  app.use('/api/employee', employee);

  //Cart route
  app.use('/api/cart', cart);

  //Order route
  app.use('/api/orders', orders);

  // Client route
  app.use('/api/client', client);

  // Receipt route
  app.use('/api/receipts', receipts);

  // Review route
  app.use('/api/review', review);
}

module.exports = route;
