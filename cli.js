'use strict';
const decamelize = require('decamelize');

const USER_AGENT = (
'Android-Finsky/6.8.44.F-all%20%5B0%5D%203087104 ' +
  '(api=3,versionCode=80684400,sdk=23,device=bullhead,' +
  'hardware=bullhead,product=bullhead,platformVersionRelease=6.0.1,' +
  'model=Nexus%205X,buildId=MHC19Q,isWideScreen=0)'
);

const DOWNLOAD_MANAGER_USER_AGENT = (
'AndroidDownloadManager/6.0.1 (Linux; U; Android 6.0.1; Nexus 5X Build/MHC19Q)'
);

const defaults = {
  username: process.env.GOOGLE_LOGIN,
  password: process.env.GOOGLE_PASSWORD,
  androidId: process.env.ANDROID_ID,
  authToken: undefined,
  countryCode: 'us',
  language: 'en_US',
  useCache: false,
  debug: process.env.DEBUG,
  apiUserAgent: USER_AGENT,
  downloadUserAgent: DOWNLOAD_MANAGER_USER_AGENT,
  sdkVersion: 23
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

