const mongoose = require('mongoose');
process.env['NODE_CONFIG_DIR'] = __dirname;
const config = require('config');
const db = config.get('mongoDBAtlasURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
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
