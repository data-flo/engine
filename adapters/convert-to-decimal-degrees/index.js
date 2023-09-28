const geocoder = require("../../utils/geocoding/opencage-geocoder");
const formater = require("../../utils/geocoding/opencage-formater");

const cache = require("../../utils/cache");

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(args["location column"]);
  const data = await args.data.transformAsync(
    async (row) => {
      if (row[args["location column"]]) {
        const query = row[args["location column"]];
        if (query) {
          const parts = query.match(/(\d+[\.,]?\d*)\W?([NS]?)\W?(\d+[\.,]?\d*)\W?([EW]?)/i);
          const [ _, lat, north, long, east ] = parseFloat(parts[0]);
          let latitude = parseFloat(lat.replace(",", "."));
          let longitude = parseFloat(long.replace(",", "."));

          if (north === "S" || north === "s") {
            latitude *= -1;
          }

          if (east === "W" || east === "w") {
            longitude *= -1;
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
