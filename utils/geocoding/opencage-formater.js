module.exports = function formater(result, feature) {
  if (feature === "address" || !feature) {
    return result?.formatted;
  }

  if (feature === "position") {
    return [
      result.geometry.lat,
      result.geometry.lng,
    ];
  }

  if (feature === "type") {
    let type = result.components._type;
    if (result.components._type === "postcode") {
      type = "postalcode";
    }
    // else if (result.resultType === "administrativeArea") {
    //   type = result.administrativeAreaType;
    // }
    // else if (result.resultType === "postalCodePoint") {
    //   type = "postalCode";
    // }
    return type;
  }

  if (feature === "country code") {
    return result?.address?.countryCode;
  }

  if (feature === "country name") {
    return result?.address?.countryName;
  }

  if (feature === "postal code") {
    return result?.address?.postalCode;
  }

  if (feature === "state") {
    return result?.address?.state;
  }

  if (feature === "county") {
    return result?.address?.county;
  }

  if (feature === "city") {
    return result?.address?.city;
  }

  throw new Error("Invalid feature");
};
