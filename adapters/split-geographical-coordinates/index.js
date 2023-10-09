module.exports = async function (args) {
  await args.data.shouldIncludeColumns(args["coordinates column"]);
  const invalidValues = new Set();
  const data = await args.data.transformAsync(
    async (row) => {
      if (row[args["coordinates column"]]) {
        const query = row[args["coordinates column"]];
        if (query) {
          const parts = query.match(/(-?\d+[\.,]?\d*)\s?([NS]?)\s?(-?\d+[\.,]?\d*)\s?([EW]?)/i);
          if (parts) {
            const [ _, lat, north, long, east ] = parts;
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
            row[args["latitude column"]] = "";
            row[args["longitude column"]] = "";
            invalidValues.add(query);
            return null;
          }
        }
      }

      return row;
    },
  );

  return {
    "data": data,
    "invalid-values": invalidValues,
  };
};

module.exports.manifest = require("./manifest.js");
