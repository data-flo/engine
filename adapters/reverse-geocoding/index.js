const geocoder = require("../../utils/geocoding/here-revgeocode");
const formater = require("../../utils/geocoding/here-formater");

const cache = require("../../utils/cache");

module.exports = async function (args) {
  const data = await args.data.addColumnAsync(
    args["location column"],
    async (row) => {
      if (row[args["latitude column"]] && row[args["longitude column"]]) {
        const coordinates = `${row[args["latitude column"]]},${row[args["longitude column"]]}`;
        const cacheKey = `reverse-geocoding ${coordinates}`;
        const place = await cache(
          cacheKey,
          () => geocoder(
            args["api key"],
            coordinates,
          ),
          360 * 24,
        );

        if (place) {
          const feature = formater(place, args["location type"]);
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
