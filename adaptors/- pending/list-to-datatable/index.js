const { Datatable } = require("../../types/datatable");

module.exports = async function (args) {

  const datatableWriter = await Datatable.create({ columns: [ args.column ] });

  for (const item of args.list) {
    datatableWriter.write([ item ]);
  }

  datatableWriter.end();

  const data = await datatableWriter.finalise();

  return {
    data,
  };
};

module.exports.manifest = require("./manifest");
