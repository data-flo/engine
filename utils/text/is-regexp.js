module.exports = function isRegexp(
  expression,
) {

  return (
    expression.startsWith("/") && expression.endsWith("/")
  );
};
