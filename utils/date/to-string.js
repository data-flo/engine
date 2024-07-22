const { isValid } = require("date-fns");
const locale = require("date-fns/locale");
const { formatInTimeZone } = require("date-fns-tz");

const standardiseFormatString = require("./standardise-format-string");

module.exports = function (dateValue, formatString, localeString, timeZone) {
  if (isValid(dateValue)) {
    const cleanFormatString = standardiseFormatString(formatString);
    return formatInTimeZone(
      new Date(dateValue),
      timeZone || "UTC",
      cleanFormatString || "yyyy-MM-dd'T'HH:mm:ssxxx",
      localeString ? { locale: locale[localeString.replace("-", "")] } : undefined,
    );

    // if (cleanFormatString) {
    //   return format(
    //     dateValue,
    //     cleanFormatString,
    //     localeString ? { locale: locale[localeString.replace("-", "")] } : undefined,
    //   );
    // }
    // else {
    //   return formatInTimeZone(
    //     dateValue,
    //     timezoneCode || "UTC",
    //     "yyyy-MM-dd'T'HH:mm:ssxxx",
    //     localeString ? { locale: locale[localeString.replace("-", "")] } : undefined,
    //   );
    // }
  }
  else {
    return undefined;
  }
};
