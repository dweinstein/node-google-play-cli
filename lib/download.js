
function download(api, pkg, vc) {
  return api.details(pkg).then(function (res) {
    return vc || res.details.appDetails.versionCode;
  })
  .then(function (versionCode) {
    return api.download(pkg, versionCode).then(function (res) {
      return res;
    });
  });
}

module.exports = download;

