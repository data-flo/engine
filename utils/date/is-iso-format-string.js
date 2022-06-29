module.exports = function isIsoFormatString(format) {
  return (
    !format
    ||
    format === "ISO 8601"
    ||
    format === "ISO8601"
    ||
    format === "yyyy-MM-dd'T'hh:mm:ss'Z'"
  );
};
