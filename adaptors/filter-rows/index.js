import { Datatable }  from "../../types/datatable";
import makePredicate  from "../../utils/expressions/make-predicate";



export default async function (args) {
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

export { default as manifest } from "./manifest";
