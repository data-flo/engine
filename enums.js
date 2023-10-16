module.exports.AggregateMethods = Object.freeze([
  [ `max`, "Max of a numeric column" ],
  [ `mean`, "Mean of a numeric column" ],
  [ `median`, "Median of a numeric column" ],
  [ `min`, "Min of a numeric column" ],
  [ `mode`, "Mode of a numeric column" ],
  [ `sum`, "Sum of a numeric column" ],
  [ `unique-values`, "A list of unique (distinct) values" ],
  [ `unique-number`, "Number of unique (distinct) values" ],
]);

module.exports.CommonDelimiters = Object.freeze([
  [ ",", "Comma (`,`)" ],
  [ ";", "Semicolon (`;`)" ],
  [ ":", "Colon (`:`)" ],
  [ "|", "Vertical bar (`\`)" ],
  [ "\\u0020", "Space" ],
  [ "\\u0009", "tab" ],
]);

module.exports.CommonLineEndings = Object.freeze([
  [ "\n", "Newline (\\n)" ],
  [ "\r\n", "CRLF (\\r\\n)" ],
  [ ",", "Comma (`,`)" ],
  [ ";", "Semicolon (`;`)" ],
  [ "\\u0020", "Space" ],
  [ "\\u0009", "tab" ],
]);

module.exports.DateFormats = Object.freeze([
  [ "yyyy-MM-dd'T'HH:mm:ssxxx", "ISO 8601 date and time + timezone (e.g. 2022-06-30T16:20:34+00:00)" ],
  [ "yyyy-MM-dd'T'HH:mm:ss'Z'", "ISO 8601 date and time in UTC (e.g. 2022-06-30T16:20:34Z)" ],
  [ "yyyy-MM-dd", "ISO 8601 date without time (e.g. 2022-06-30)" ],
  [ "dd/MM/yyyy", "date/month/year (e.g. 30/06/2022)" ],
  [ "MM/dd/yyyy", "month/date/year (e.g. 06/30/2022)" ],
  [ "yyyy/MM/dd", "year/month/date (e.g. 06/30/2022)" ],
  [ "dd.MM.yyyy", "date.month.year (e.g. 30.06.2022)" ],
  [ "dd MMM yyyy", "date month year (e.g. 30 Jun 2022)" ],
  [ "HH:mm", "24-hour time (e.g. 16:20)" ],
  [ "hh:mm", "12-hour time (e.g. 04:20 pm)" ],
  [ "T", "Milliseconds timestamp (e.g. 512969520900)" ],
  [ "t", "Seconds timestamp (e.g. 512969520)" ],
]);

module.exports.DurationUnits = Object.freeze([
  "years", "quarter", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds",
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

module.exports.FilterTypes = Object.freeze([
  [ "is-blank", "Value is blank" ],
  [ "not-blank", "Value is not blank" ],
  [ "equals", "Text is equal to" ],
  [ "not-equals", "Text is not equal to" ],
  [ "includes", "Text contains" ],
  [ "excludes", "Text does not contain" ],
  [ "starts-with", "Text starts with" ],
  [ "not-starts-with", "Text does not start with" ],
  [ "ends-with", "Text ends with" ],
  [ "not-ends-with", "Text does not end with" ],
  [ "regex", "Text matches a regular expression" ],
  [ "not-regex", "Text does not match a regular expression" ],
  [ "greater-than", "Number is greater than" ],
  [ "greater-than-or-equal", "Number is greater than or equal to" ],
  [ "less-than", "Number is less than" ],
  [ "less-than-or-equal", "Number is less than or equal to" ],
  [ "between", "Number is between" ],
  [ "not-between", "Number is not between" ],
  [ "equals", "Number is equal to" ],
  [ "not-equals", "Number is not equal to" ],
  [ "is-number", "Value is a number" ],
  [ "not-number", "Value is not a number" ],
]);

module.exports.JoinTypes = Object.freeze([
  [ "Left Join", "All rows from `main data` will be included, along with matching rows from `other data`" ],
  [ "Inner Join", "Rows from `main data` that do not have matches in `other data` will be excluded" ],
  [ "Full Join", "All rows from `main data` and `other data` will be included" ],
]);

module.exports.LanguageLocales = Object.freeze([
  "af", "ar", "ar-DZ", "ar-EG", "ar-MA", "ar-SA", "ar-TN", "az", "be", "bg", "bn", "bs", "ca", "cs", "cy", "da", "de", "de-AT", "el", "en-AU", "en-CA", "en-GB", "en-IE", "en-IN", "en-NZ", "en-US", "en-ZA", "eo", "es", "et", "eu", "fa-IR", "fi", "fr", "fr-CA", "fr-CH", "fy", "gd", "gl", "gu", "he", "hi", "hr", "ht", "hu", "hy", "id", "is", "it", "ja", "ja-Hira", "ka", "kk", "km", "kn", "ko", "lb", "lt", "lv", "mk", "mn", "ms", "mt", "nb", "nl", "nl-BE", "nn", "pl", "pt", "pt-BR", "ro", "ru", "sk", "sl", "sq", "sr", "sr-Latn", "sv", "ta", "te", "th", "tr", "ug", "uk", "uz", "uz-Cyrl", "vi", "zh-CN", "zh-HK", "zh-TW",
]);

module.exports.LetterCases = Object.freeze([
  [ "camel", "camel case (`OfMice and men` → `ofMiceAndMen`)", "text with the separator denoted by the next word capitalised" ],
  [ "capital", "capital case (`OfMice and men` → `Of Mice And Men`)", "space separated text with each word capitalised" ],
  [ "constant", "constant case (`OfMice and men` → `OF_MICE_AND_MEN`)", "upper case text with an underscore between words" ],
  [ "dot", "dot case (`OfMice and men` → `of.mice.and.men`)", "lower case string with a period between words" ],
  [ "header", "header case (`OfMice and men` → `Of-Mice-And-Men`)", "dash separated string of capitalised words" ],
  [ "hyphen", "hyphen case (`OfMice and men` → `of-mice-and-men`)", "lower cased string with dashes between words (same as kebab case)" ],
  [ "kebab", "kebab case (`OfMice and men` → `of-mice-and-men`)", "lower cased string with dashes between words" ],
  [ "lower", "lower case (`OfMice and men` → `ofmice and men`)", "text with all letters lower case" ],
  [ "no", "no case (`OfMice and men` → `of mice and men`)", "lower cased string with spaces between words" ],
  [ "param", "param case (`OfMice and men` → `of-mice-and-men`)", "lower cased string with dashes between words (same as kebab case)" ],
  [ "pascal", "pascal case (`OfMice and men` → `OfMiceAndMen`)", "string of capitalised words without separators" ],
  [ "path", "path case (`OfMice and men` → `of/mice/and/men`)", "lower case string with slashes between words" ],
  [ "sentence", "sentence case (`OfMice and men` → `Of mice and men`)", "lower case with spaces between words and capitalised first letter" ],
  [ "snake", "snake case (`OfMice and men` → `of_mice_and_men`)", "lower case string with underscores between words" ],
  [ "sponge", "sponge case (`OfMice and men` → `oFmiCe anD mEN`)", "string with random capitalisation applied" ],
  [ "swap", "swap case (`OfMice and men` → `oFmICE AND MEN`)", "swaps every character from upper to lower case, or lower to upper case" ],
  [ "title", "title case (`OfMice and men` → `OfMice and Men`)", "a mixed-case style following English language rules" ],
  [ "upper", "upper case (`OfMice and men` → `OFMICE AND MEN`)", "text with all letters upper case" ],
]);

module.exports.SamplingStretegies = Object.freeze([
  [ "first", "Selects the first N rows in the datatable" ],
  [ "random", "Selects a random N rows from the datatable" ],
  [ "last", "Selects the last N rows in the datatable" ],
]);

module.exports.SortDirections = Object.freeze([
  [ "asc", "Ascending order" ],
  [ "desc", "Descending order" ],
]);

module.exports.UnmappedValues = Object.freeze([
  [ "blank", "Replace original value with blank" ],
  [ "include", "Keep original value" ],
]);
