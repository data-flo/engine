import naturalCompare  from "natural-compare";
import { Datatable }  from "../../types/datatable";



export default async function (args) {
  const columnNames = [];
  const sortOrders = [];

  for (const [ columnName, sortOrder ] of args["column names"].entries()) {
    columnNames.push(columnName);
    if (sortOrder === "asc") {
      sortOrders.push(1);
    }
    else if (sortOrder === "desc") {
      sortOrders.push(-1);
    }
    else {
      throw new Error(`Invalid sort order for column: \`${columnName}\`. Should be either \`asc\` or \`desc\``);
    }
  }

  await args.data.shouldIncludeColumns(columnNames);

  const rows = await args.data.readAllRows();

  rows.sort(
    (a, b) => {
      for (let index = 0; index < columnNames.length; index++) {
        const columnName = columnNames[index];
        const result = sortOrders[index] * naturalCompare(a[columnName], b[columnName]);
        if (result !== 0) {
          return result;
        }
      }
      return 0;
    }
  );

  const data = await Datatable.createFromIterable(rows);

  return { data };
};

export { default as manifest } from "./manifest";
