var Long = require('long');
var extend = require('xtend');

function unescape (str) {
  return (str + Array(5 - str.length % 4).join('=')).replace(/\-/g,'+').replace(/_/g, '/');
}

function decodeDigest (str) {
  return new Buffer(unescape(str), 'base64').toString('hex');
}

function signatureToSha1 (sig) {
  return decodeDigest(sig);
}

module.exports = function getAppInfo (api, pkg, vc) {
  return api.details(pkg)
  .then(function (d) {
    vc = vc || d.details.appDetails.versionCode;
    var basicInfo = {
      appCategory: d.details.appDetails.appCategory,
      certificateHash: d.details.appDetails.certificateHash.map(signatureToSha1),
      certificateSet: d.details.appDetails.certificateSet.map((x) => {
        return signatureToSha1(x.certificateHash);
      }),
      email: d.details.appDetails.developerEmail,
      minDownloadCount: Number(d.details.appDetails.numDownloads.replace(/,|\+/g, '').replace('downloads', '')),
      name: d.title,
      packageName: pkg,
      price: d.offer.map(function (m) { return m.formattedAmount; }),
      vendor: d.creator,
      website: d.details.appDetails.developerWebsite
    };
    var checkoutRequired = d.offer.some(function (o) { return o.checkoutFlowRequired; });
    if (checkoutRequired) {
      return basicInfo;
    }
    return api.downloadInfo(pkg, vc)
    .then(function (res) {
      return extend(basicInfo, {
        sha1: signatureToSha1(res.signature),
        versionCode: vc,
        size: Long.fromValue(res.downloadSize).toNumber()
      });
    });
  });
};

