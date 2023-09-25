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

  await detectDatatypes(
    args.data,
    columns,
  );

  const datatableWriter = await Datatable.create({ columns });

  datatableWriter.end();

  const data = await datatableWriter.finalise();

  return { data };
};

module.exports.manifest = require("./manifest.js");
