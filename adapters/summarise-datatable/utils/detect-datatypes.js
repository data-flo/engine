/* eslint-disable no-restricted-globals */

const { Datatable } = require("../../../types/datatable");

async function detectDatatypes(
  datatable,
  columns,
) {
  const hasNonNumbers = {};
  const hasNonDates = {};
  for await (const row of datatable.getReader()) {
    for (const column of columns) {
      const value = row[column];
      if (value !== "") {
        if (!hasNonNumbers[column]) {
          const isNumber = !isNaN(value) && !isNaN(parseFloat(value));
          if (!isNumber) {
            hasNonNumbers[column] = true;
          }
        }
        if (!hasNonDates[column]) {
          const isDate = !isNaN(Number(new Date(value)));
          if (!isDate) {
            hasNonDates[column] = true;
          }
        }
      }
    }
  }

  const types = {};
  for (const column of columns) {
    if (!hasNonNumbers[column]) {
      types[column] = "number";
    }
    else if (!hasNonDates[column]) {
      types[column] = "date";
    }
    else {
      types[column] = "string";
    }
  }

  return types;
}

module.exports = detectDatatypes;
