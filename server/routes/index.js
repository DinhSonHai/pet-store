const products = require('./api/products');
const types = require('./api/types');
const categories = require('./api/categories');
const auth = require('./api/auth');
const cart = require('./api/cart');
const order = require('./api/order');
const client = require('./api/client');

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

  //Order route
  app.use('/api/order', order);

  // Client route
  app.use('/api/client', client);
}

module.exports = route;
