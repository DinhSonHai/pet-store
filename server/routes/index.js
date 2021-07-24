const products = require('./api/products');
const types = require('./api/types');
const categories = require('./api/categories');
const auth = require('./api/auth');
const orders = require('./api/orders');
const client = require('./api/client');
const receipts = require('./api/receipts');
const employee = require('./api/employee');
const reviews = require('./api/reviews');
const bills = require('./api/bills');
const statistical = require('./api/statistical');
const blog = require('./api/blog');
const discountOffer = require('./api/discountOffer');
const contacts = require('./api/contacts');
const promos = require('./api/promos');
const notifications = require('./api/notifications');
const customers = require('./api/customer');

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

  //Order route
  app.use('/api/orders', orders);

  // Client route
  app.use('/api/client', client);

  // Receipt route
  app.use('/api/receipts', receipts);

  // Review route
  app.use('/api/reviews', reviews);

  // Bill route
  app.use('/api/bills', bills);

  // Statistical route
  app.use('/api/statistical', statistical);

  // Blog route
  app.use('/api/blogs', blog);

  // Discount offer route
  app.use('/api/discountOffer', discountOffer);

  // Contacts route
  app.use('/api/contacts', contacts);

  // Pormo route
  app.use('/api/promos', promos);

  // Notifications
  app.use('/api/notifications', notifications);

  // Customer
  app.use('/api/customers', customers);
}

module.exports = route;
