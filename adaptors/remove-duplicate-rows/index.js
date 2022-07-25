const lodash = require("lodash");

const includesWithIsEqual = function (rows, itemToCompare) {
  for (const item of rows) {
    if (lodash.isEqual(item, itemToCompare)) {
      return true;
    }
  }
  return false;
};

module.exports = async function (args) {
  const hashes = new Set();
  for await (const row of args.data.gerReader()) {
    if (row[rightIdColumn] && !rightRowsMap.get(row[rightIdColumn])) {
      rightRowsMap.set(row[rightIdColumn], row);
    }
  }

  const rows = [];
  const duplicates = [];
  for (const row of args.data.rows) {
    if (!includesWithIsEqual(rows, row)) {
      rows.push(row);
    }
    else {
      duplicates.push(row);
    }
  }
  return {
    duplicates: {
      columns: args.data.columns,
      rows: duplicates,
    },
    data: {
      columns: args.data.columns,
      rows,
    },
  };
};

module.exports.manifest = require("./manifest");
