const makeRegexp = require("../../utils/text/make-regexp");

const { EmptyArray } = require("../../utils/constants");

module.exports = async function (args) {
  const columnsToKeep = [ ...args["column names"] || EmptyArray ];

  if (args.pattern) {
    const regex = makeRegexp(args.pattern);
    for (const column of (await args.data.getColumns())) {
      if (regex.test(column)) {
        columnsToKeep.add(column);
      }
    }
  }

  const data = await args.data.clone(columnsToKeep);

  return { data };
};

module.exports.manifest = require("./manifest.js");
