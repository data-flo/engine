import { EmptyArray }  from "../../utils/constants";
import { Datatable }  from "../../types/datatable";



export default async function (args) {
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

export { default as manifest } from "./manifest";
