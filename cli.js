'use strict';
const decamelize = require('decamelize');
const defaults = {
  username: process.env.GOOGLE_LOGIN,
  password: process.env.GOOGLE_PASSWORD,
  androidId: process.env.ANDROID_ID,
  countryCode: 'us',
  useCache: false,
  _debug: process.env.DEBUG
}

const alias = Object.keys(defaults).reduce((a, k) => {
  a[decamelize(k, '-')] = k;
  return a;
}, {})

module.exports = require('rc')(
  'gpcli',
  defaults,
  require('minimist')(process.argv, {
    alias: alias
  })
);

if (!module.parent) {
  console.log(module.exports);
}

