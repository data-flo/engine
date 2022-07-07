const reverseGeocode = require("../../utils/data/reverse-geocode");
const geocodedPlaceToFeature = require("../../utils/data/geocoded-place-to-feature");

const cache = require("../../utils/cache");

module.exports = async function (args) {
  const data = await args.data.addColumnAsync(
    args["feature column"],
    async (row) => {
      if (row[args["latitude column"]] && row[args["longitude column"]]) {
        const coordinates = `${row[args["latitude column"]]}, ${row[args["longitude column"]]}`;
        const cacheKey = `adaptors/reverse-geocoding/${coordinates}`;
        const place = await cache(
          cacheKey,
          360 * 24,
          () => reverseGeocode(
            args["api key"],
            coordinates,
          )
        );
        // const place = await reverseGeocode(
        //   args["api key"],
        //   `${row[args["latitude column"]]} ${row[args["ongitude column"]]}`,
        // );
        const feature = geocodedPlaceToFeature(place, args["feature type"]);
        return feature || "";
      }
      else {
        return "";
      }
    },
  );

  return { data };
};

module.exports.manifest = require("./manifest");
