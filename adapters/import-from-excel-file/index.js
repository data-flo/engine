const ExcelJS = require("exceljs");

const { Datatable } = require("../../types/datatable");

const parseRange = require("../../utils/spreadsheets/parse-range");

function checkRange(worksheetReader, sheetRange) {
  const requiredRange = parseRange(sheetRange);
  const fullRange = parseRange(worksheetReader.dimensions.toString());

  if (requiredRange.start.col === null) {
    requiredRange.start.col = fullRange.start.col;
  }
  if (requiredRange.start.row === null) {
    requiredRange.start.row = fullRange.start.row;
  }
  if (requiredRange.end.col === null) {
    requiredRange.end.col = fullRange.end.col;
  }
  if (requiredRange.end.row === null) {
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

async function extractWorksheet(worksheetReader, sheetRange) {
  const dataWriter = await Datatable.create();

  let range;
  let columnNames = null;
  for await (const sheetRow of worksheetReader) {
    if (!range) {
      range = checkRange(worksheetReader, sheetRange);
    }

    if (sheetRow.number >= range.start.row) {
      if (!columnNames) {
        columnNames = [];
        for (let index = range.start.col; index <= range.end.col; index++) {
          columnNames.push(sheetRow.getCell(index).text);
        }
      }
      else {
        const dataRow = {};
        for (let index = range.start.col; index <= range.end.col; index++) {
          const columnNameIndex = index - range.start.col;
          dataRow[columnNames[columnNameIndex]] = sheetRow.getCell(index).text;
        }
        dataWriter.write(dataRow);
      }
    }

    if (sheetRow.number >= range.end.row) {
      break;
    }
  }

  dataWriter.end();

  const data = await dataWriter.finalise();

  return data;
}

module.exports = async function (args) {

  // const options = {
  //   entries: "ignore",
  //   styles: "ignore",
  //   sharedStrings: "ignore",
  //   hyperlinks: "ignore",
  //   worksheets: 'emit',
  // };

  const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(args.file.getSource());

  let data;
  for await (const worksheetReader of workbookReader) {
    if (workbookReader.model.sheets.length === 0) {
      throw new Error("Spreadsheets does not contain any sheets");
    }

    const sheetname = args.sheetname || workbookReader.model.sheets[0].name;

    if (!workbookReader.model.sheets.some((x) => x.name === sheetname)) {
      throw new Error(`Cannot find a sheet named \`${sheetname}\``);
    }

    if (worksheetReader.name === sheetname) {
      data = await extractWorksheet(worksheetReader, args.range || "A1:");
      break;
    }
  }

  return { data };
};

module.exports.manifest = require("./manifest.js");
