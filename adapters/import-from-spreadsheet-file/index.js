const XLSX = require("xlsx");

const { Datatable } = require("../../types/datatable.js");
const isInteger = require("../../utils/numbers/is-integer.js");

module.exports = async function (args, context) {
  const workbook = XLSX.readFile(
    args.file.getSource(),
    {
      raw: true,
    },
  );

  if (args["sheet name"] && !workbook.SheetNames.includes(args["sheet name"])) {
    throw new Error(`Workbook does not include a sheet named '${args["sheet name"]}'`);
  }

  const dataWriter = await Datatable.create();

  const worksheet = workbook.Sheets[args["sheet name"] || workbook.SheetNames[0]];
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

module.exports.manifest = require("./manifest.js");
