const fs = require("fs");

module.exports = function (value) {
  if (typeof value === "string") {
    return () => fs.createReadStream(value);
  }

  if (typeof value === "function") {
    return value;
  }

  throw new Error(`Cannot convert value '${value}' to file stream`);
};
