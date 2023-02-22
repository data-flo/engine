import { parse, parseISO, isValid }  from "date-fns";
import locale  from "date-fns/locale";
import standardiseFormatString  from "./standardise-format-string";



export default function (stringValue, formatString, localeString) {
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
    dateValue = parseISO(
      stringValue,
    );
  }

  if (isValid(dateValue)) {
    return dateValue;
  }
  else {
    return undefined;
  }
};
