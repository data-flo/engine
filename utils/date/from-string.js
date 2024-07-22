const { parse, parseISO, isValid } = require("date-fns");
const locale = require("date-fns/locale");
const { zonedTimeToUtc } = require("date-fns-tz");
const standardiseFormatString = require("./standardise-format-string");

module.exports = function (stringValue, formatString, localeString) {
  const cleanFormatString = standardiseFormatString(formatString);

  let dateValue;

  if (cleanFormatString) {
    dateValue = parse(
      stringValue,
      cleanFormatString,
      new Date(),
      localeString ? { locale: locale[localeString.replace("-", "")] } : undefined,
    );

  }
  else {
    dateValue = parseISO(stringValue);
  }

  if (isValid(dateValue)) {
    return zonedTimeToUtc(dateValue);
  }
  else {
    return undefined;
  }
};
