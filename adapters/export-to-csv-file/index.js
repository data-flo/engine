module.exports = async function createDatatable(args) {
  let data = args.data;

  if (args.columns || args.delimiter !== ",") {
    data = await args.data.clone(
      args.columns,
      { delimiter: args.delimiter },
    );
  }

  const file = await data.toFileStream();

  file.name = args["output file name"];
  file.mediaType = "text/csv";

  return { file };
};

module.exports.manifest = require("./manifest");
