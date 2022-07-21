const lodash = require("lodash");

const { Datatable } = require("../../types/datatable");

module.exports = async function (args) {
  const columnNames = [];
  const sortOrders = [];

  for (const [ columnName, sortOrder ] of args["column names"].entries()) {
    columnNames.push(columnName);
    if (sortOrder === "asc" || sortOrder === "desc") {
      sortOrders.push(sortOrder);
    }
    else {
      throw new Error(`Invalid sort order for column: \`${columnName}\`. Should be either \`asc\` or \`desc\``);
    }
  }

  await args.data.shouldIncludeColumns(columnNames);

  const rows = await args.data.readAllRows();

  const sortedRows = lodash.orderBy(
    rows,
    columnNames,
    sortOrders,
  );

  const data = await Datatable.createFromIterable(sortedRows);

  return { data };
};

module.exports.manifest = require("./manifest");
