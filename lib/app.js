var Long = require('long');

function unescape (str) {
  return (str + Array(5 - str.length % 4).join('=')).replace(/\-/g,'+').replace(/_/g, '/');
}

function decode_digest (str) {
  return new Buffer(unescape(str), 'base64').toString('hex');
}

function signatureToSha1(sig) {
  return decode_digest(sig);
}

module.exports = function getAppInfo(api, pkg, vc) {
  return api.details(pkg)
  .then(function (d) {
    vc = vc || d.details.appDetails.versionCode;
    var vs = d.details.appDetails.versionString;
    var ch = d.details.appDetails.certificateHash.map(signatureToSha1);
    return api.downloadInfo(pkg, vc)
    .then(function (res) {
      return {
        certificateHash: ch,
        email: d.details.appDetails.developerEmail,
        minDownloadCount: Number(d.details.appDetails.numDownloads.replace(/,|\+/g, '')),
        name: d.title,
        packageName: pkg,
        price: d.offer.map(function (m) { return m.formattedAmount; }),
        sha1: signatureToSha1(res.signature),
        size: Long.fromValue(res.downloadSize).toNumber(),
        uploadDate: d.details.appDetails.uploadDate,
        vendor: d.creator,
        versionCode: vc,
        versionString: vs,
        website: d.details.appDetails.developerWebsite
      };
    });
  });
};

