const geocoder = require("../../utils/geocoding/opencage-geocoder.js");
const formater = require("../../utils/geocoding/opencage-formater.js");

const cache = require("../../utils/cache/index.js");

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(args["location column"]);
  const data = await args.data.transformAsync(
    async (row) => {
      if (row[args["location column"]]) {
        const query = `${row[args["location column"]]}`;
        const cacheKey = `forward-geocoding ${query}`;
        const place = await cache(
          cacheKey,
          () => geocoder(
            args["api key"],
            query,
          ),
          360 * 24,
        );
        if (place) {
          const [latitude, longitude] = formater(place, "position");
          row[args["latitude column"]] = latitude.toFixed(args["decimal places"]);
          row[args["longitude column"]] = longitude.toFixed(args["decimal places"]);
          if (args["place type column"]) {
            const type = formater(place, "type");
            row[args["place type column"]] = type;
          }
        }
      }
      else {
        row[args["latitude column"]] = null;
        row[args["longitude column"]] = null;
        if (args["place type column"]) {
          row[args["place type column"]] = null;
        }
      }

      return row;
    },
  );
  return { data };
};

module.exports.manifest = require("./manifest.js");
