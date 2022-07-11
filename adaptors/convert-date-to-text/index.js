const moment = require("moment");

const toString = require("../../utils/date/to-string");

module.exports = function (args) {

  toString(
    args.value || new Date(),
    
  )

  const momentValue = moment(args.value || new Date());

  if (momentValue.isValid()) {
    if (args.locale) {
      momentValue.locale(args.locale);
    }
    return {
      text: (
        (args.format === "ISO 8601")
          ?
          momentValue.format()
          :
          momentValue.format(args.format)
      ),
    };
  }

  return {
    text: null,
  };
};

module.exports.manifest = require("./manifest");
