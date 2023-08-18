const { Datatable } = require("../../types/datatable");

const makePredicate = require("../../utils/expressions/make-predicate");

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(args["column name"]);

  const predicate = makePredicate(
    args["filter type"],
    [ args["filter value"] ],
    args["case sensitive"],
  );

  const dataWriter = await Datatable.create();
  const complementaryWriter = await Datatable.create();

  for await (const row of args.data.getReader()) {
    if (predicate(row[args["column name"]])) {
      dataWriter.write(row);
    }
    else {
      complementaryWriter.write(row);
    }
  }

  dataWriter.end();
  complementaryWriter.end();

  const data = await dataWriter.finalise();
  const complementary = await complementaryWriter.finalise();

  return {
    complementary,
    data,
  };
};

module.exports.manifest = require("./manifest.js");
