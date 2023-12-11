const rbql = require("rbql");

const tmpFilePath = require("../../utils/file/tmp-path.js");

const { Datatable } = require("../../types/datatable.js");

module.exports = async function (args) {
  const filePath = await tmpFilePath({ touch: false });

  const warnings = [];

  await rbql.query_csv(
    args.query,
    args.data.getSource(),
    ",",
    "quoted",
    filePath,
    ",",
    "quoted",
    "utf-8",
    warnings,
    true /* with_headers */,
  );

  const data = new Datatable(filePath);

  return { data };
};

module.exports.manifest = require("./manifest.js");
