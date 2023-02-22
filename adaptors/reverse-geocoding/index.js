import geocoder  from "../../utils/geocoding/geocoder";
import geocodedPlaceToFeature  from "../../utils/geocoding/geocoded-place-to-feature";
import cache  from "../../utils/cache";





export default async function (args) {
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

export { default as manifest } from "./manifest";
