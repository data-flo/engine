const tmp = require("tmp-promise");

module.exports = async function (options) {
  const { fd, path, cleanup } = await tmp.file();
  return fd;
};
