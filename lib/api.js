var GooglePlayAPI = require('gpapi').GooglePlayAPI;
var cfg = require('../cli')

var api = GooglePlayAPI(cfg);

module.exports = api;

