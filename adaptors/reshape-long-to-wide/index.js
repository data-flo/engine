import { Datatable }  from "../../types/datatable";
import GroupMap  from "../../utils/structures/group-map";



export default async function (args) {
  await args.data.shouldIncludeColumns(
    args["key column name"],
    args["value column name"],
  );

  const nonVariableColumns = [];
  for (const column of (await args.data.getColumns())) {
    if (
      column !== args["key column name"]
      &&
      column !== args["value column name"]
    ) {
      nonVariableColumns.push(column);
    }
  }

  if (nonVariableColumns.length === 0) {
    throw new Error("Data must have at least three columns.");
  }

  const wideColumns = new Set(nonVariableColumns);

  const groups = new GroupMap();
  for await (const row of args.data.getReader()) {
    const groupKeys = [];
    for (const column of nonVariableColumns) {
      groupKeys.push(row[column]);
    }
    groups.add(
      groupKeys.join(""),
      row,
    );

    wideColumns.add(row[args["key column name"]]);
  }

  const dataWriter = await Datatable.create({
    columns: Array.from(wideColumns),
  });

  for (const longRows of groups.values()) {
    const wideRow = {};
    for (const column of nonVariableColumns) {
      wideRow[column] = longRows[0][column];
    }
    for (const longRow of longRows) {
      if (longRow[args["key column name"]]) {
        wideRow[longRow[args["key column name"]]] = longRow[args["value column name"]];
      }

    }
    dataWriter.write(wideRow);
  }

  dataWriter.end();

  const data = await dataWriter.finalise();

  return { data };
};

export { default as manifest } from "./manifest";
