
var GooglePlayAPI = require('node-googleplay-api').GooglePlayAPI;

var api = GooglePlayAPI(
  process.env.GOOGLE_LOGIN, process.env.GOOGLE_PASSWORD,
  process.env.ANDROID_ID,
  false,
  false
);

module.exports = api;

