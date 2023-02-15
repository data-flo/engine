module.exports = function parseSMBSharePath(share, filePath) {
  let shareAddress = share;
  if (/^smb:\/\//i.test(shareAddress)) {
    shareAddress = shareAddress.substr(4);
  }
  shareAddress = shareAddress.replace(/\\/g, "/");

  let remoteFilePath = filePath;
  if (remoteFilePath.startsWith(share)) {
    remoteFilePath = remoteFilePath.substr(share.length);
  }
  remoteFilePath = remoteFilePath.replace(/\\/g, "/");
  if (remoteFilePath.startsWith("/")) {
    remoteFilePath = remoteFilePath.substr(1);
  }

  return [
    shareAddress,
    remoteFilePath,
  ];
};
