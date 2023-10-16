const getIndex = require("./get-datatable-index.js");
const readLines = require("./read-lines.js");

module.exports = async function (source, from, to) {
  const index = await getIndex(source);
  return readLines(index, source, from, to);
};
