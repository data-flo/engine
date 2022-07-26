const XLSX = require("xlsx");
const ExcelJS = require("exceljs");

// TODO: use https://github.com/exceljs/exceljs
module.exports = async function (args, context) {
  const options = {
    entries: 'ignore',
    styles: 'ignore',
    sharedStrings: 'ignore',
    hyperlinks: 'ignore',
    // worksheets: 'ignore',
  };

  const workbook = new ExcelJS.stream.xlsx.WorkbookReader(args.file.getSource(), options);
  for await (const {eventType, value} of workbook.parse()) {
    console.log(eventType, value)
    for await (const row of value) {
      console.log(row)
    }
  }

  const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(args.file.getSource());
  for await (const worksheetReader of workbookReader) {
    for await (const row of worksheetReader) {
      console.log(row)
    }
  }
  /*
  const filePath = await context.utils.file.path(args.file);
  const workbook = XLSX.readFile(
    filePath, {
      raw: true,
    });
  if (args.sheetname && !workbook.SheetNames.includes(args.sheetname)) {
    throw new Error(`Workbook does not include a sheet named '${args.sheetname}'`);
  }
  const worksheet = workbook.Sheets[args.sheetname || workbook.SheetNames[0]];
  const range = (Number.parseInt(args.range, 10) - 1) || args.range || undefined;
  const rows = XLSX.utils.sheet_to_json(
    worksheet,
    {
      range,
      raw: false,
      header: 0,
    }
  );
  const [ columns ] = XLSX.utils.sheet_to_json(
    worksheet,
    {
      range,
      header: 1,
    }
  );
  return {
    data: {
      columns,
      rows,
    },
  };
  */
};

module.exports.manifest = require("./manifest");
