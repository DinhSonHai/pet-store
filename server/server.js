const express = require('express');
process.env['NODE_CONFIG_DIR'] = __dirname + '\\config';
const config = require('config');

const connectDB = require('./config/db');
const route = require('./routes');

const app = express();

//Init middlewares to parses incoming requests with JSON payloads
app.use(express.json());

//Connect DB
connectDB();

const PORT = config.get('PORT') || 5000;

route(app);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
