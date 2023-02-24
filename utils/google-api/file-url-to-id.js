const validUrl = /^https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([^\/]+)/i;

module.exports = function fileUrlToId(url) {
  const match = validUrl.exec(url);
  if (match && match[1]) {
    return match[1];
  }
  else {
    throw new Error("Invalid Google Drive file URL.");
  }
};
