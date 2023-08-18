const naturalCompare = require("natural-compare");

module.exports = function (args) {
  const sign = (args["sort direction"] === "desc") ? -1 : 1;
  const list = (
    [ ...args.list ]
      .sort(
        (a, b) => sign * naturalCompare(a, b)
      )
  );

  return { list };
};

module.exports.manifest = require("./manifest.js");
