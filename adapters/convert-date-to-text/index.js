const toString = require("../../utils/date/to-string.js");
const fromString = require("../../utils/date/from-string.js");

module.exports = function (args) {
  const originalDate = fromString(
    args["value"] ?? new Date().toISOString(),
    args["original format"] || "yyyy-MM-dd'T'HH:mm:ssxxx",
    args["locale"],
    args["timezone"] || "UTC"
  );
  if (!originalDate) {
    throw new Error(`Date does not match the original format`);
  }

  const text = toString(
    originalDate,
    args["format"] || args["new format"] || "yyyy-MM-dd'T'HH:mm:ssxxx",
    args["locale"],
    args["timezone"] || "UTC"
  );
  return {
    "text": text,
  };
};

module.exports.manifest = require("./manifest.js");
