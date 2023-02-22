import XLSX  from "xlsx";
import { Datatable }  from "../../types/datatable";
import isInteger  from "../../utils/numbers/is-integer";




export default async function (args, context) {
  const workbook = XLSX.readFile(
    args.file.getSource(),
    {
      raw: true,
    },
  );

  if (args.sheetname && !workbook.SheetNames.includes(args.sheetname)) {
    throw new Error(`Workbook does not include a sheet named '${args.sheetname}'`);
  }

  const dataWriter = await Datatable.create();

  const worksheet = workbook.Sheets[args.sheetname || workbook.SheetNames[0]];
  const range = (isInteger(args.range) && `A${args.range}:`) || args.range || undefined;

  const stream = XLSX.stream.to_json(
    worksheet,
    {
      range,
      raw: false,
      header: 0,
      defval: null,
    },
  );

  stream.pipe(dataWriter);

  const data = await dataWriter.finalise();

  return { data };
};

export { default as manifest } from "./manifest";
