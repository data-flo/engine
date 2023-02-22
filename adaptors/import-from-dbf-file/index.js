import DBFFile  from "dbffile";
import { Datatable }  from "../../types/datatable";



export default async function (args) {
  const dbf = await DBFFile.open(args.dbf.getSource());

  const columns = dbf.fields.map((x) => x.name);

  const datatableWriter = await Datatable.create({ columns });

  for (let index = 0; index < dbf.recordCount; index++) {
    const records = await dbf.readRecords(1);
    const row = {};
    for (const column of columns) {
      row[column] = records[0][column];
    }
    datatableWriter.write(row);
  }

  datatableWriter.end();

  const data = await datatableWriter.finalise();

  return { data };

};

export { default as manifest } from "./manifest";
