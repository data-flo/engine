module.exports.CommonDelimiters = Object.freeze([
  [ ",", "Comma" ],
  [ ";", "Semicolon" ],
  [ "\\u0020", "Space" ],
  [ "\\u0009", "tab" ],
]);

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

module.exports.FileEncodings = Object.freeze([
  "ascii",
  "base64",
  "binary",
  "hex",
  "ucs2",
  "utf8",
  "latin1",
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
