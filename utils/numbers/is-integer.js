const isNumber = require("./is-number");

module.exports = function isInteger(n) {
  return isNumber(n) && Number.isInteger(parseFloat(n));
};
