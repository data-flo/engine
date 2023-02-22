import { format, isValid }  from "date-fns";
import locale  from "date-fns/locale";
import { formatInTimeZone }  from "date-fns-tz";
import standardiseFormatString  from "./standardise-format-string";





export default function (dateValue, formatString, localeString, timezoneCode) {
  if (isValid(dateValue)) {
    const cleanFormatString = standardiseFormatString(formatString);

    return formatInTimeZone(
      dateValue,
      timezoneCode || "UTC",
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
