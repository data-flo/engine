const naturalCompare = require("natural-compare");

module.exports = function (args) {
  const sign = (args["sort direction"] === "desc") ? -1 : 1;
  const list = (
    [ ...args.list ]
      .sort(
        (a, b) => {
          return sign * naturalCompare(a.toLowerCase(), b.toLowerCase());

          // if (a < b) {
          //   return forwardOrder;
          // }

          // if (a > b) {
          //   return reverseOrder;
          // }

          // // names must be equal
          // return 0;
        }
      )
  );

  return { list };
};

module.exports.manifest = require("./manifest");
