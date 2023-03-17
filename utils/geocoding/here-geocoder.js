const axios = require("axios");

module.exports = function forwardGeocode(hereApiKey, query, geographicArea) {
  return (
    axios({
      method: "GET",
      url: "https://geocode.search.hereapi.com/v1/geocode",
      params: {
        q: query,
        apiKey: hereApiKey,
        gen: 9,
        limit: 1,
        in: geographicArea ? `countryCode:${geographicArea}` : undefined,
        lang: "en",
      },
    })
      .then((res) => {
        if (res.data?.items?.[0]) {
          const place = res.data.items[0];
          return place;
        }
        else {
          return undefined;
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          throw new Error("Invalid HERE API KEY");
        }
        throw new Error(`HERE API Error ${error.response.status}: ${error.response.statusText}. ${error.response?.data?.error_description}`);
      })
  );
};
