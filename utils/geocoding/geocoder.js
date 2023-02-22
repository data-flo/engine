import opencage  from "opencage-api-client";

export default function reverseGeocode(opencageApiKey, query, confidenceSorce, proximity) {
  return opencage
    .geocode({
      q: query,
      key: opencageApiKey,
      limit: 1,
      min_confidence: confidenceSorce,
      no_annotations: 1,
    })
    .then((data) => {
      // console.log(JSON.stringify(data));
      if (data.results.length > 0) {
        const place = data.results[0];
        return place;
      }
      else {
        return undefined;
      }
    })
    .catch((error) => {
      if (error.status.code === 402) {
        throw new Error("OpenCage limit exceeded, see https://opencagedata.com/pricing");
      }
      throw new Error(`OpenCage error ${error.status.code}`);
    });
};
