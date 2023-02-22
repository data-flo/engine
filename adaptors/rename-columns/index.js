
export default async function (args) {
  const columnMappping = {};
  for (const column of (await args.data.getColumns())) {
    const mappedName = args["column names"].get(column);
    if (mappedName || !args["discard unmapped"]) {
      columnMappping[column] = mappedName || column;
    }
  }
  const data = await args.data.clone(columnMappping);
  return { data };
};

export { default as manifest } from "./manifest";
