/* eslint eqeqeq: 0 */

module.exports = async function (
  sheetData,
  data,
  idColumn,
  headerRowIndex,
  appendRows,
  appendColumns,
) {
  const cellUpdates = [];
  const appendedColumns = [];
  const updatedIds = new Set();
  const createdIds = new Set();
  const skippedIds = new Set();

  const columnsMapping = new Map();
  const sheetHeaders = sheetData.length ? sheetData[headerRowIndex - 1].map((cell) => (cell ? cell.trim() : null)) : [];
  let numberOfColumns = sheetHeaders.length;
  for (const column of (await data.getColumns())) {
    const index = sheetHeaders.indexOf(column);
    if (index >= 0) {
      columnsMapping.set(column, index);
    }
    else if (appendColumns) {
      appendedColumns.push(column);
      columnsMapping.set(column, numberOfColumns);
      cellUpdates.push([0, numberOfColumns, column]);
      numberOfColumns += 1;
    }
  }

  const rowsMapping = new Map();
  const idColumnIndex = sheetHeaders.indexOf(idColumn);
  for (let index = headerRowIndex; index < sheetData.length; index++) {
    const sheetRow = sheetData[index];
    rowsMapping.set(sheetRow[idColumnIndex], index);
  }

  let numberOfRows = (sheetData.length > 0) ? sheetData.length : 1;
  for await (const row of data.getReader()) {
    const rowId = row[idColumn];
    if (rowsMapping.has(rowId)) {
      const sheetRowIndex = rowsMapping.get(rowId);
      const sheetRow = sheetData[sheetRowIndex];
      for (const [column, sheetColumnIndex] of columnsMapping.entries()) {
        if (column in row && (row[column] || "") != (sheetRow[sheetColumnIndex] || "")) {
          cellUpdates.push([sheetRowIndex, sheetColumnIndex, row[column] || ""]);
          updatedIds.add(rowId);
        }
      }
    }
    else if (appendRows) {
      const sheetRowIndex = numberOfRows;
      numberOfRows += 1;
      for (const [column, sheetColumnIndex] of columnsMapping.entries()) {
        cellUpdates.push([sheetRowIndex, sheetColumnIndex, row[column]]);
        createdIds.add(rowId);
      }
    }
    else {
      skippedIds.add(rowId);
    }
  }

  return [
    cellUpdates,
    Array.from(updatedIds),
    Array.from(createdIds),
    Array.from(skippedIds),
    appendedColumns,
  ];
};
