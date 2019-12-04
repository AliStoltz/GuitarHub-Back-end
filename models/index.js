const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.MONGODB_URI;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected..'))
  .catch((error) => console.log(`MongoDB connection error: ${error}`));

  module.exports = {
    User: require('./User'),
    Guitar: require('./Guitar'),
    Comment: require('./Comment'),
  };