const ExcelJS = require("exceljs");

const { Datatable } = require("../../types/datatable.js");

const parseRange = require("../../utils/spreadsheets/parse-range.js");
const getRowIndices = require("../../utils/spreadsheets/get-row-indices.js");

async function extractWorksheet(
  worksheetReader,
  sheetRange,
  skippedRowIndices,
) {
  const dataWriter = await Datatable.create();

  const requiredRange = parseRange(sheetRange);

  let columnNames = null;
  for await (const sheetRow of worksheetReader) {
    const startCol = (requiredRange.start.col || worksheetReader.dimensions.left);
    const endCol = (requiredRange.end.col || worksheetReader._columns.length);
    // if (!range) {
    //   range = checkRange(worksheetReader, sheetRange);
    // }

    if (sheetRow.number >= (requiredRange.start.row || worksheetReader.dimensions.top)) {
      if (!columnNames) {
        columnNames = [];
        for (let index = startCol; index <= endCol; index++) {
          columnNames.push(sheetRow.getCell(index).text);
        }
      }
      else {
        if (skippedRowIndices && skippedRowIndices.has(sheetRow.number)) {
          continue;
        }
        const dataRow = {};
        for (let index = startCol; index <= endCol; index++) {
          const columnNameIndex = index - startCol;
          if (sheetRow.getCell(index).value instanceof Date) {
            dataRow[columnNames[columnNameIndex]] = sheetRow.getCell(index).value.toISOString();
          }
          else {
            dataRow[columnNames[columnNameIndex]] = sheetRow.getCell(index).text;
          }
        }
        dataWriter.write(dataRow);
      }
    }

    if (requiredRange.end.row && sheetRow.number >= requiredRange.end.row) {
      break;
    }
  }

  dataWriter.end();

  const data = await dataWriter.finalise();

  return data;
}

module.exports = async function (args) {
  const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(
    args.file.getSource(),
    {
      entries: "emit",
      sharedStrings: "cache",
      hyperlinks: "cache",
      styles: "cache",
      worksheets: "emit",
    },
  );

  const skippedRowIndices = getRowIndices(args.skip);

  let data;
  for await (const worksheetReader of workbookReader) {
    if (workbookReader.model.sheets.length === 0) {
      throw new Error("Spreadsheets does not contain any sheets");
    }

    const sheetName = args["sheet name"] || workbookReader.model.sheets[0].name;

    if (!workbookReader.model.sheets.some((x) => x.name === sheetName)) {
      throw new Error(`Cannot find a sheet named \`${sheetName}\``);
    }

    if (worksheetReader.name === sheetName) {
      data = await extractWorksheet(worksheetReader, args.range || "A1:", skippedRowIndices);
      break;
    }
  }

  return { data };
};

module.exports.manifest = require("./manifest.js");
