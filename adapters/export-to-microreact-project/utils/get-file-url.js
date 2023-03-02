const storeFile = require("./store-file");

module.exports = async function getFileUrl(apiUrl, accessToken, file, url) {
  if (file) {
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
