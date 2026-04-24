const { Datatable } = require("../../types/datatable");
const GroupMap = require("../../utils/structures/group-map");
const aggregator = require("../../utils/arrays/aggregator");


function appendAggregated(columnName) {
  return `${columnName} (aggregated)`
}

function appendMethod([columnName, method]) {
  return `${columnName} (${method})`
}

module.exports = async function (args) {
  const groupedColumns = [...args["group column names"]];
  const aggregatedColumns = [...args.aggregations.entries()]

  await args.data.shouldIncludeColumns(
    groupedColumns,
  );

  await args.data.shouldIncludeColumns(
    [...args.aggregations.keys()]
  );

  const columns = [
    ...groupedColumns.map(appendAggregated),
    ...aggregatedColumns.map(appendMethod)
  ]

  const dataWriter = await Datatable.create({ columns });


  const groups = new GroupMap();
  for await (const row of args.data.getReader()) {
    const groupKeys = [];
    for (const groupedColumn of groupedColumns) {
      groupKeys.push(row[groupedColumn]);
    }
    groups.add(
      groupKeys.join(""),
      row,
    );
  }

  for (const groupRows of groups.values()) {
    const row = {};

    for (const groupedColumn of groupedColumns) {
      row[appendAggregated(groupedColumn)] = groupRows[0][groupedColumn];
    }

    for (const [aggregatedColumn, method] of aggregatedColumns) {
      const aggregatorFunction = aggregator(method, aggregatedColumn);
      row[appendMethod([aggregatedColumn, method])] = aggregatorFunction(groupRows);
    }

    dataWriter.write(row);
  }

  dataWriter.end();

  const data = await dataWriter.finalise();

  return { data };
};

module.exports.manifest = require("./manifest.js");
