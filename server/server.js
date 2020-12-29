const express = require('express');
const path = require('path');

const connectDB = require('./config/db');
const route = require('./routes');

const app = express();
app.use(express.json());

connectDB();

route(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
