/* eslint-disable no-restricted-globals */

const { Datatable } = require("../../../types/datatable");

async function detectDatatypes(
  datatable,
  columns,
) {
  const hasNonNumbers = {};
  const hasNonDates = {};
  const uniqueValues = {};
  const nonEmptyValues = {};
  const sums = {};

  for (const column of columns) {
    uniqueValues[column] = new Set();
    nonEmptyValues[column] = 0;
    sums[column] = 0;
  }
  let rowCount = 0;

  for await (const row of datatable.getReader()) {
    rowCount += 1;
    for (const column of columns) {
      const value = row[column];
      if (value !== "") {
        nonEmptyValues[column] += 1;
        uniqueValues[column].add(value);

        if (!hasNonNumbers[column]) {
          const valueAsFloat = parseFloat(value);
          const isNumber = !isNaN(value) && !isNaN(valueAsFloat);
          if (!isNumber) {
            hasNonNumbers[column] = true;
          }
          else {
            sums[column] += valueAsFloat;
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

  const summary = [];

  for (const column of columns) {
    let type;
    if (!hasNonNumbers[column]) {
      type = "number";
    }
    else if (!hasNonDates[column]) {
      type = "date";
    }
    else {
      type = "string";
    }

    const numberOfUniqueValues = uniqueValues[column].size;
    const numberOfEmptyValues = rowCount - nonEmptyValues[column];

    summary.push({
      "Column": column,
      "Type": type,
      [`Missing % (out of ${rowCount})`]: `${(numberOfEmptyValues / rowCount * 100).toFixed(1)}% (${numberOfEmptyValues})`,
      "Unique values": numberOfUniqueValues,
      "Mean": (type === "number") ? Number((sums[column] / nonEmptyValues[column]).toFixed(2)) : "",
    });
  }

  return summary;
}

module.exports = detectDatatypes;
