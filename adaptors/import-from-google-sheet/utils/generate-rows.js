module.exports = async function* generateRows(spreadsheetData, skippedRowIndices) {
  const { sheetValues, sheetRange } = spreadsheetData;
  const columns = sheetValues[0];

  if (sheetValues.length > 1) {
    const startRowIndex = parseInt(sheetRange.fromRow, 10);

    for (let index = 1; index < sheetValues.length; index++) {
      if (skippedRowIndices && skippedRowIndices.has(startRowIndex + index)) {
        continue;
      }
      const row = {};
      for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
        row[columns[columnIndex]] = sheetValues[index][columnIndex];
      }
      yield row;
    }
  }
};
