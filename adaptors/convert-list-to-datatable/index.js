import { Datatable }  from "../../types/datatable";

export default async function (args) {

  const datatableWriter = await Datatable.create({ columns: [ args["column name"] ] });

  for (const item of args.list) {
    datatableWriter.write([ item ]);
  }

  datatableWriter.end();

  const data = await datatableWriter.finalise();

  return {
    data,
  };
};

export { default as manifest } from "./manifest";
