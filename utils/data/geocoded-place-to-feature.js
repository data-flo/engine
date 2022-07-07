const featureMap = {
  "house number": "house_number",
  "address": "road",
  "postcode": "postcode",
  "locality": "village",
  "village": "village",
  "town": "town",
  "place": "town",
  "neighborhood": "suburb",
  "district": "city",
  "city": "city",
  "county": "county",
  "region": "state",
  "state": "state",
  "country": "country",
  "country code": "country_code",
  "ISO 3166-1 alpha 2": "ISO_3166-1_alpha-2",
  "ISO 3166-1 alpha 3": "ISO_3166-1_alpha-3",
  "continent": "continent",
  "poi": "",
  "full": "",
  "what3words": "",
  "flag": "",
  "timezone code": "",
  "timezone name": "",
  "currency code": "",
  "currency name": "",
  "geometry": "",
};

module.exports = function geocodedPlaceToFeature(place, feature) {
  if (!(feature in featureMap)) {
    throw new Error("Invalid feature");
  }

  if (feature === "poi" || feature === "full") {
    return place.formatted;
  }

  if (feature === "geometry") {
    return place.geometry;
  }

  if (featureMap[feature]) {
    return place?.components[featureMap[feature]];
  }

  if (feature === "flag") {
    return place?.annotations?.flag;
  }

  if (feature === "currency code") {
    return place?.annotations?.currency?.code;
  }
  if (feature === "currency name") {
    return place?.annotations?.currency?.name;
  }

  if (feature === "what3words") {
    return place?.annotations?.what3words?.words;
  }

  if (feature === "timezone code") {
    return place?.annotations?.timezone?.short_name;
  }
  if (feature === "timezone name") {
    return place?.annotations?.timezone?.name;
  }

  throw new Error("Invalid feature");
};
