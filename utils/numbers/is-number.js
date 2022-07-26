/* eslint-disable no-restricted-globals */

module.exports = function isNumber(n) {
  return (typeof n === "string" || typeof n === "number") && !isNaN(parseFloat(n)) && !isNaN(n - 0) && n !== "";
};
