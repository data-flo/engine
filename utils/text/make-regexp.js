import escapeStringRegexp  from "escape-string-regexp";

export default function makeRegexp(expression, ignoreCase = true, global = false) {
  const flags = [];
  if (ignoreCase) {
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
