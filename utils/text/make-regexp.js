const escapeStringRegexp = require("escape-string-regexp");

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
    (expression.startsWith("/") && expression.endsWith("/"))
      ?
      expression.substring(1, expression.length - 1)
      :
      escapeStringRegexp(expression),
    flags.join(""),
  );

};
