const mongoose = require('mongoose');
const bool = require('boolean');
mongoose.Promise = require('bluebird');

module.exports = function (data, callback) {
  if (typeof data === 'function') {
    callback = data;
    data = {
      host: process.env.MONGODB_HOST,
      port: process.env.MONGODB_PORT,
      name: process.env.MONGODB_NAME,
      ssl: bool(process.env.MONGODB_SSL)
    };
  }
  let url = process.env.MONGODB_URL || `mongodb://${data.host}:${data.port}/${data.name}`;
  console.log(`Opening connection to ${url}`);
  mongoose.connect(url, {
	useNewUrlParser: true,
    ssl: !!data.ssl
  }, (err) => callback(err, mongoose.connection));
};