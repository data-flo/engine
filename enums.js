module.exports.DateFormats = Object.freeze([
  [ "yyyy-MM-dd'T'HH:mm:ssxxx", "ISO 8601 date and time in UTC (e.g. 2022-06-30T16:20:34+00:00)" ],
  [ "yyyy-MM-dd", "ISO 8601 date (e.g. 2022-06-30)" ],
  [ "dd/MM/yyyy", "date/month/year (e.g. 30/06/2022)" ],
  [ "MM/dd/yyyy", "month/date/year (e.g. 06/30/2022)" ],
  [ "yyyy/MM/dd", "year/month/date (e.g. 06/30/2022)" ],
  [ "dd.MM.yyyy", "date.month.year (e.g. 30.06.2022)" ],
  [ "dd MMM yyyy", "date month year (e.g. 30 Jun 2022)" ],
  [ "HH:mm", "24-hour time (e.g. 16:20)" ],
  [ "hh:mm", "12-hour time (e.g. 04:20 pm)" ],
]);

module.exports.DurationUnits = Object.freeze([
  "years", "quarter", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds",
]);

module.exports.CommonDelimiters = Object.freeze([
  [ ",", "Comma" ],
  [ ";", "Semicolon" ],
  [ "\\u0020", "Space" ],
  [ "\\u0009", "tab" ],
]);

module.exports.FileEncodings = Object.freeze([
  "ascii",
  "base64",
  "binary",
  "hex",
  "ucs2",
  "utf8",
  "latin1",
]);
