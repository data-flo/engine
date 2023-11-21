const tmp = require("tmp-promise");
const touch = require("touch");

const { EmptyObject } = require("../constants/index.js");

module.exports = async function (options = EmptyObject) {
  const path = await tmp.tmpName(options);
  await touch(path);
  // const { path } = await tmp.file({
  //   discardDescriptor: true,
  //   detachDescriptor: true,
  //   keep: true,
  //   ...options,
  // });
  return path;
};
