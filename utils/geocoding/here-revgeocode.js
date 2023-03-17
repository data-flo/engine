const axios = require("axios");

function viewToPosition(viewResult) {
  let type = viewResult.resultType;
  if (viewResult.resultType === "locality") {
    type = viewResult.localityType;
  }
  else if (viewResult.resultType === "administrativeArea") {
    type = viewResult.administrativeAreaType;
  }
  else if (viewResult.resultType === "postalCodePoint") {
    type = "postalCode";
  }
  return [
    viewResult.position.lat,
    viewResult.position.lng,
    type,
  ];
}

module.exports = function reverseGeocode(hereApiKey, query) {
  return (
    axios({
      method: "GET",
      url: "https://revgeocode.search.hereapi.com/v1/revgeocode",
      params: {
        at: query,
        apiKey: hereApiKey,
        gen: 9,
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

module.exports.viewToPosition = viewToPosition;
