const mongoose = require('mongoose');
const { mongoDBLocalURI } = require('../config/default.json');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBLocalURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    //Exit process when connect failure
    process.exit(1);
  }
};

module.exports = connectDB;
