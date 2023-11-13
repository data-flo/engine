const makeRegexp = require("../../utils/text/make-regexp.js");

const { EmptyArray } = require("../../utils/constants/index.js");

module.exports = async function (args) {
  const columnsToKeep = [ ...args["column names"] || EmptyArray ];

  if (args.pattern) {
    const regex = makeRegexp(args.pattern);
    for (const column of (await args.data.getColumns())) {
      if (regex.test(column)) {
        columnsToKeep.push(column);
      }
    }
  }

  const data = await args.data.clone(columnsToKeep);

  return { data };
};

module.exports.manifest = require("./manifest.js");
