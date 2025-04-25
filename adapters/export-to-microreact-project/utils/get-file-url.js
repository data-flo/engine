const debug = require("cgps-stdlib/logger/debug.js");

const storeFile = require("./store-file.js");

module.exports = async function getFileUrl(apiUrl, accessToken, file, url) {
  if (file) {
    debug("Saving file via Microreact API...");

    const svaedUrl = await storeFile(
      apiUrl,
      accessToken,
      file.getReader(),
    );

    return svaedUrl.url;
  }

  if (url) {
    return url;
  }

  return undefined;
};
