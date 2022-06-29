/* eslint no-restricted-globals: 0 */

const { format, formatISO, isValid } = require("date-fns");
const locale = require("date-fns/locale");
const standardiseFormatString = require("./standardise-format-string");

module.exports = function (dateValue, dirtyFormatString, localeString) {
  if (isValid(dateValue)) {
    const cleanFormatString = standardiseFormatString(dirtyFormatString);

    if (cleanFormatString) {
      return format(
        dateValue,
        cleanFormatString,
        localeString ? { locale: locale[localeString.replace("-", "")] } : undefined,
      );
    }
    else {
      return formatISO(dateValue);
    }
  }
  else {
    return undefined;
  }
};
