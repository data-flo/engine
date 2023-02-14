const geocoder = require("../../utils/geocoding/geocoder");

const geocodedPlaceToFeature = require("../../utils/geocoding/geocoded-place-to-feature");

const cache = require("../../utils/cache");

module.exports = async function (args) {
  const data = await args.data.addColumnAsync(
    args["location column"],
    async (row) => {
      if (row[args["latitude column"]] && row[args["longitude column"]]) {
        const coordinates = `${row[args["latitude column"]]}, ${row[args["longitude column"]]}`;
        const cacheKey = `adaptors/reverse-geocoding/${coordinates}`;
        const place = await cache(
          cacheKey,
          360 * 24,
          () => geocoder(
            args["api key"],
            coordinates,
          )
        );

        if (place) {
          const feature = geocodedPlaceToFeature(place, args["location type"]);
          if (feature) {
            return feature;
          }
        }
      }

      return "";
    },
  );

  return { data };
};

module.exports.manifest = require("./manifest");
