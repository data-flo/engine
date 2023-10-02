module.exports = async function (args) {
  await args.data.shouldIncludeColumns(args["location column"]);
  const data = await args.data.transformAsync(
    async (row) => {
      if (row[args["location column"]]) {
        const query = row[args["location column"]];
        if (query) {
          const [ _, lat, north, long, east ] = query.match(/(-?\d+[\.,]?\d*)\s?([NS]?)\s?(-?\d+[\.,]?\d*)\s?([EW]?)/i);
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
      }

      return row;
    },
  );

  return { data };
};

module.exports.manifest = require("./manifest.js");
