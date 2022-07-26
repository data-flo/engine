const geocoder = require("../../utils/data/geocoder");
const geocodedPlaceToFeature = require("../../utils/geocoding/geocoded-place-to-feature");

const cache = require("../../utils/cache");

module.exports = async function (args) {
  const data = await args.data.transformAsync(
    args["feature column"],
    async (row) => {
      if (row[args["place column"]]) {
        const query = `${row[args["place column"]]}`;
        const cacheKey = `adaptors/forward-geocoding/${query}`;

        const place = await cache(
          cacheKey,
          360 * 24,
          () => geocoder(
            args["api key"],
            query,
          )
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
