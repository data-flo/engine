const geocoder = require("../../utils/geocoding/opencage-geocoder");
const formater = require("../../utils/geocoding/opencage-formater");

const cache = require("../../utils/cache");

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
          row[args["latitude column"]] = latitude.toFixed(args.digits);
          row[args["longitude column"]] = longitude.toFixed(args.digits);
          if (args["type column"]) {
            const type = formater(place, "type");
            row[args["type column"]] = type;
          }
        }
      }

      return row;
    },
  );

  return { data };
};

module.exports.manifest = require("./manifest.js");
