const { EmptyArray } = require("../../utils/constants");

const { Datatable } = require("../../types/datatable");

module.exports = async function (args) {
  const nonVariableColumns = args["static columns"] || EmptyArray;
  const variabeColumns = (
    (await args.data.getColumns())
      .filter((x) => !nonVariableColumns.includes(x))
  );

  const dataWriter = await Datatable.create();

  for await (const wideRow of args.data.getReader()) {
    const baseRow = {};
    for (const column of nonVariableColumns) {
      baseRow[column] = wideRow[column];
    }
    for (const column of variabeColumns) {
      dataWriter.write({
        ...baseRow,
        [args["key column name"]]: column,
        [args["value column name"]]: wideRow[column],
      });
    }
  }

  dataWriter.end();

  const data = await dataWriter.finalise();

  return { data };
};

module.exports.manifest = require("./manifest.js");
