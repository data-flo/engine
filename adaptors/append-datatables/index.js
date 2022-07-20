const { Datatable } = require("../../types/datatable");

module.exports = async function extendDatatable(args) {
  const columns = {};
  for (const column of (await args["first data"].getColumns())) {
    columns.push({ key: column, header: column });
  }
  for (const column of (await args["second data"].getColumns())) {
    columns.push({ key: column, header: column });
  }

  const datatableWriter = await Datatable.create({ columns });

  for await (const row of args["first data"].getReader()) {
    datatableWriter.write(row);
  }

  for await (const row of args["second data"].getReader()) {
    datatableWriter.write(row);
  }

  datatableWriter.end();

  const data = await datatableWriter.finalise();

  return { data };
};

module.exports.manifest = require("./manifest");
