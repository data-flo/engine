const { Datatable } = require("../../types/datatable.js");

function calculateSampleSize(input, totalRowCount) {
  let size = parseInt(input);

  if (input.endsWith("%")) {
    size = Math.round(totalRowCount * size / 100);
  }

  return Math.min(size, totalRowCount);
}

module.exports = async function (args) {
  const dataWriter = await Datatable.create();

  const totalRowCount = await args["data"].getNumberOfRows();
  const sampleSize = calculateSampleSize(
    args["sample size"],
    totalRowCount,
  );

  if (sampleSize >= totalRowCount) {
    return {
      "sample data": args["data"],
      "sample size": totalRowCount,
    };
  }

  if (args["sampling method"] === "first") {
    let index = 1;
    for await (const row of args.data.getReader()) {
      if (index <= sampleSize) {
        dataWriter.write(row);
      }
      else {
        break;
      }

      index += 1;
    }
  }
  else if (args["sampling method"] === "last") {
    let index = 1;
    const startRow = totalRowCount - sampleSize + 1;
    for await (const row of args.data.getReader()) {
      if (index >= startRow) {
        dataWriter.write(row);
      }

      index += 1;
    }
  }
  else if (args["sampling method"] === "random") {
    let sampled = 0;
    const sampledRows = [];
    const allRows = [];
    for (let rowNum = 1; rowNum <= totalRowCount; rowNum++) {
      allRows.push(rowNum);
    }
    while (sampledRows.length < sampleSize) {
      const [ rowNum ] = allRows.splice(
        Math.floor(Math.random() * allRows.length),
        1,
      );
      sampledRows.push(rowNum);
    }
    let index = 1;
    for await (const row of args.data.getReader()) {
      if (sampledRows.includes(index)) {
        dataWriter.write(row);
        sampled += 1;
      }

      if (sampled === sampleSize) {
        break;
      }

      index += 1;
    }
  }

  dataWriter.end();

  const data = await dataWriter.finalise();

  return {
    "sample data": data,
    "sample size": sampleSize,
  };
};

module.exports.manifest = require("./manifest.js");
