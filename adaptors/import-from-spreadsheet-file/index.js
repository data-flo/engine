const ExcelJS = require("exceljs");

const { Datatable } = require("../../types/datatable");

const parseRange = require("../../utils/spreadsheets/parse-range");

async function checkRange(worksheetReader, sheetRange) {
  const requiredRange = parseRange(sheetRange);
  const fullRange = parseRange(worksheetReader.dimensions);

  if (requiredRange.end.col === 0) {
    requiredRange.end.col = fullRange.end.col;
  }
  if (requiredRange.end.row === 0) {
    requiredRange.end.row = fullRange.end.row;
  }

  if (
    requiredRange.start.col < fullRange.start.col
    ||
    requiredRange.start.row < fullRange.start.row
    ||
    requiredRange.end.col > fullRange.end.col
    ||
    requiredRange.end.row > fullRange.end.row
  ) {
    throw new Error(`Invalid sheet range ${sheetRange}. Range must be within ${worksheetReader.dimensions}`);
  }

  return requiredRange;
}

async function extractWorksheet(worksheetReader, range) {
  const dataWriter = await Datatable.create();

  let columns = null;
  for await (const sheetRow of worksheetReader) {
    if (!columns) {
      for (let index = range.start.col; index < range.end.col; index++) {

      }
    }
    const dataRow = {};

    dataWriter.write(dataRow);
  }

  const data = await dataWriter.finalise();

  return data;
}

module.exports = async function (args) {
  
  const options = {
    // entries: "ignore",
    // styles: "ignore",
    // sharedStrings: "ignore",
    // hyperlinks: "ignore",
    // worksheets: 'ignore',
  };

  const workbook = new ExcelJS.stream.xlsx.WorkbookReader(args.file.getSource(), options);
  // for await (const {eventType, value} of workbook.parse()) {
  //   console.log(eventType, value)
  //   for await (const row of value) {
  //     console.log(row)
  //   }
  // }

  const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(args.file.getSource(), options);
  for await (const worksheetReader of workbookReader) {
    if (!args.sheetname || worksheetReader.name === args.sheetname) {
      const range = checkRange(worksheetReader, args.range || "A1:");
      await extractWorksheet(worksheetReader, range)
      for await (const row of worksheetReader) {
        console.log(typeof row);
      }
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
