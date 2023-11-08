// const stopwatch = require("../../utils/stopwatch.js");
const { Datatable } = require("../../types/datatable.js");

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(args["coordinates column"]);
  const invalidRows = new Set();
  const data = await args.data.transformSync(
    (row) => {
      if (row[args["coordinates column"]]) {
        const query = row[args["coordinates column"]];
        if (query) {
          // stopwatch.start("query.match")
          const parts = query.match(/(-?\d+[\.,]?\d*)\s?([NS]?)[^0-9]+(-?\d+[\.,]?\d*)\s?([EW]?)/i);
          // stopwatch.stop("query.match")
          if (parts) {
            const [_, lat, north, long, east] = parts;
            let latitude = lat.replace(",", ".");
            let longitude = long.replace(",", ".");

            if (north === "S" || north === "s") {
              latitude = `-${latitude}`;
            }

            if (east === "W" || east === "w") {
              longitude = `-${longitude}`;
            }

            row[args["latitude column"]] = latitude;
            row[args["longitude column"]] = longitude;
          }
          else {
            console.error(row);
            invalidRows.add(row);
            row[args["latitude column"]] = "";
            row[args["longitude column"]] = "";
            return null;
          }
        }
      }

      return row;
    },
  );

  return {
    "data": data,
    "invalid rows": await Datatable.createFromIterable(invalidRows),
  };
};

module.exports.manifest = require("./manifest.js");
