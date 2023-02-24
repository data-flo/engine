const opencage = require("opencage-api-client");

module.exports = function reverseGeocode(opencageApiKey, query, confidenceSorce, proximity) {
  console.log("geocoder.js");
  return opencage
    .geocode({
      q: query,
      key: opencageApiKey,
      limit: 1,
      min_confidence: confidenceSorce,
      no_annotations: 1,
    })
    .then((data) => {
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
