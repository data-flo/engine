const { Datatable } = require("../../types/datatable");

module.exports = async function extendDatatable(args) {
  const datatableWriter = await Datatable.create();

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
