import {
  differenceInDays,
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInMonths,
  differenceInQuarters,
  differenceInSeconds,
  differenceInWeeks,
  differenceInYears,
}  from "date-fns";

export default function (refDate, valueDate, unit) {
  if (unit === "years") {
    return differenceInYears(refDate, valueDate);
  }

  if (unit === "quarters") {
    return differenceInQuarters(refDate, valueDate);
  }

  if (unit === "months") {
    return differenceInMonths(refDate, valueDate);
  }

  if (unit === "weeks") {
    return differenceInWeeks(refDate, valueDate);
  }

  if (unit === "days") {
    return differenceInDays(refDate, valueDate);
  }

  if (unit === "hours") {
    return differenceInHours(refDate, valueDate);
  }

  if (unit === "minutes") {
    return differenceInMinutes(refDate, valueDate);
  }

  if (unit === "seconds") {
    return differenceInSeconds(refDate, valueDate);
  }

  if (unit === "milliseconds") {
    return differenceInMilliseconds(refDate, valueDate);
  }

  return undefined;
};
