const geocoder = require("../../utils/geocoding/geocoder");
const geocodedPlaceToFeature = require("../../utils/geocoding/geocoded-place-to-feature");

const cache = require("../../utils/cache");

module.exports = async function (args) {
  const data = await args.data.transformAsync(
    async (row) => {
      if (row[args["location column"]]) {
        const query = `${row[args["location column"]]}`;
        const cacheKey = `adaptors/forward-geocoding/${query}`;

        const place = await cache(
          cacheKey,
          () => geocoder(
            args["api key"],
            query,
          ),
          360 * 24,
        );

        if (place) {
          const [ latitude, longitude, type ] = geocodedPlaceToFeature(place, "geometry");
          row[args["latitude column"]] = latitude;
          row[args["longitude column"]] = longitude;
          if (row[args["type column"]]) {
            row[args["type column"]] = type;
          }
        }
      }

      return row;
    },
  );

  return { data };
};

module.exports.manifest = require("./manifest");
