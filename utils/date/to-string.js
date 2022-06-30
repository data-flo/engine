/* eslint no-restricted-globals: 0 */

const { format, isValid } = require("date-fns");
const locale = require("date-fns/locale");
const { formatInTimeZone } = require("date-fns-tz");

const standardiseFormatString = require("./standardise-format-string");

module.exports = function (dateValue, formatString, localeString) {
  if (isValid(dateValue)) {
    const cleanFormatString = standardiseFormatString(formatString);
    if (cleanFormatString) {
      return format(
        dateValue,
        cleanFormatString,
        localeString ? { locale: locale[localeString.replace("-", "")] } : undefined,
      );
    }
    else {
      return formatInTimeZone(
        dateValue,
        "UTC",
        "yyyy-MM-dd'T'HH:mm:ssxxx"
      );
    }
  }
  else {
    return undefined;
  }
};
