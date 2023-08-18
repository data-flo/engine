const { Datatable } = require("../../types/datatable");

const getProjectSlug = require("./get-project-slug");
const fetchEntries = require("./fetch-entries");

module.exports = async function (args) {
  const slug = getProjectSlug(args.url);

  const datatableWriter = await Datatable.create();

  const entries = fetchEntries(
    slug,
    args["map index"],
    args["client id"],
    args["client secret"],
  );

  for await (const row of entries) {
    datatableWriter.write(row);
  }

  datatableWriter.end();

  const data = await datatableWriter.finalise();

  return {
    data,
    slug,
  };
};

module.exports.manifest = require("./manifest.js");
