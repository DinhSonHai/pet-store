const mongoose = require('mongoose');
const { mongoDBAtlasURI } = require('../config/default.json');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBAtlasURI, {
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
