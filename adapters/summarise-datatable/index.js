const { Datatable } = require("../../types/datatable.js");
const detectDatatypes = require("./utils/detect-datatypes.js");

module.exports = async function summariseDatatable(args) {
  let columns;
  if (args.columns) {
    await args.data.shouldIncludeColumns(args.columns);
    columns = args.columns;
  }
  else {
    columns = await args.data.getColumns();
  }

  const summaryRows = await detectDatatypes(
    args.data,
    columns,
  );

  const summary = await Datatable.createFromIterable(summaryRows);

  return { summary };
};

module.exports.manifest = require("./manifest.js");
