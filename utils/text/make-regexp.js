const escapeStringRegexp = require("escape-string-regexp");

const isRegexp = require("./is-regexp.js");

module.exports = function makeRegexp(
  expression,
  matchCase = false,
  global = false,
) {
  const flags = [];
  if (!matchCase) {
    flags.push("i");
  }
  if (global) {
    flags.push("g");
  }

  return new RegExp(
    isRegexp(expression)
      ?
      expression.substring(1, expression.length - 1)
      :
      escapeStringRegexp(expression),
    flags.join(""),
  );

};
