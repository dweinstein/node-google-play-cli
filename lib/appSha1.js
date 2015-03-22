
function unescape (str) {
  return (str + Array(5 - str.length % 4).join('=')).replace(/\-/g,'+').replace(/_/g, '/');
}

function decode_digest (str) {
  return new Buffer(unescape(str), 'base64').toString('hex');
}

function signatureToSha1(sig) {
  return decode_digest(sig);
}

function getDeliveryDataVc(api, pkg, vc) {
  return api.deliveryData(pkg, vc)
  .then(function (info) {
    return signatureToSha1(info.signature);
  });
}

module.exports = function getAppSha1(api, pkg, vc) {
  return api.details(pkg)
  .then(function (res) {
    vc = vc || res.details.appDetails.versionCode;
    return getDeliveryDataVc(api, pkg, vc)
    .then(function (res) {
      return {packageName:pkg, versionCode: vc, sha1: res};
    });
  });
};

