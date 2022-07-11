const toString = require("../../utils/date/to-string");

module.exports = function (args) {
  const text = toString(
    args.value || new Date(),
    args.format,
    args.locale,
    args.timezone,
  );

  return { text };
};

module.exports.manifest = require("./manifest");
