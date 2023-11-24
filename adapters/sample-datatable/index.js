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

  let index = 1;
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
    const startRow = totalRowCount - sampleSize + 1;
    for await (const row of args.data.getReader()) {
      if (index >= startRow) {
        dataWriter.write(row);
      }

      index += 1;
    }
  }
  else if (args["sampling method"] === "random") {
    const prob = sampleSize / totalRowCount;
    let sampled = 0;
    for await (const row of args.data.getReader()) {
      if (Math.random() >= prob) {
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
