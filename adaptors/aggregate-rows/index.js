const { Datatable } = require("../../types/datatable");
const GroupMap = require("../../utils/structures/group-map");
const aggregator = require("../../utils/arrays/aggregator");

module.exports = async function (args) {
  const groupedTableColumnNames = [ ...args["group column names"] ];

  await args.data.shouldIncludeColumns(
    args["group column names"],
  );

  for (const key of args.aggregations.keys()) {
    groupedTableColumnNames.push(key);
    args.data.shouldIncludeColumns(key);
  }

  const groups = new GroupMap();
  for await (const row of args.data.getReader()) {
    const groupKeys = [];
    for (const column of args["group column names"]) {
      groupKeys.push(row[column]);
    }
    groups.add(
      groupKeys.join(""),
      row,
    );
  }

  const dataWriter = await Datatable.create({ columns: groupedTableColumnNames });

  for (const groupRows of groups.values()) {
    const row = {};

    for (const column of args["group column names"]) {
      row[column] = groupRows[0][column];
    }

    for (const [ column, method ] of args.aggregations.entries()) {
      const aggregatorFunction = aggregator(method, column);
      row[column] = aggregatorFunction(groupRows);
    }

    dataWriter.write(row);
  }

  dataWriter.end();

  const data = await dataWriter.finalise();

  return { data };
};

module.exports.manifest = require("./manifest");
