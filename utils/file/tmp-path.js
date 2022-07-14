const tmp = require("tmp-promise");

const { EmptyObject } = require("../constants");

module.exports = async function (options = EmptyObject) {
  const { fd, path, cleanup } = await tmp.file({ discardDescriptor: true, ...options });
  return path;
};
