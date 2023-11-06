const escapeRegexp = require("escape-string-regexp");
const isNumber = require("../numbers/is-number.js");

module.exports = function makePredicate(
  operator,
  expression,
  caseSensetive = false,
) {
  switch (operator) {
    // case "in": {
    //   const values = expression.split(",");
    //   return (x) => (values.includes(x?.valueOf()));
    // }

    case "includes": {
      const regexp = new RegExp(escapeRegexp(expression), caseSensetive ? undefined : "i");
      return (x) => (regexp.test(x) === true);
    }

    case "excludes": {
      const regexp = new RegExp(escapeRegexp(expression), caseSensetive ? undefined : "i");
      return (x) => (regexp.test(x) === false);
    }

    case "is-blank": {
      return (x) => !x;
    }

    case "not-blank": {
      return (x) => !!x;
    }

    case "equals": {
      const regexp = new RegExp(`^${escapeRegexp(expression)}$`, caseSensetive ? undefined : "i");
      return (x) => (regexp.test(x) === true);
    }

    case "not-equals": {
      const regexp = new RegExp(`^${escapeRegexp(expression)}$`, caseSensetive ? undefined : "i");
      return (x) => (regexp.test(x) === false);
    }

    case "starts-with": {
      const regexp = new RegExp(`^${escapeRegexp(expression)}`, caseSensetive ? undefined : "i");
      return (x) => (regexp.test(x) === true);
    }

    case "not-starts-with": {
      const regexp = new RegExp(`^${escapeRegexp(expression)}`, caseSensetive ? undefined : "i");
      return (x) => (regexp.test(x) === false);
    }

    case "ends-with": {
      const regexp = new RegExp(`${escapeRegexp(expression)}$`, caseSensetive ? undefined : "i");
      return (x) => (regexp.test(x) === true);
    }

    case "not-ends-with": {
      const regexp = new RegExp(`${escapeRegexp(expression)}$`, caseSensetive ? undefined : "i");
      return (x) => (regexp.test(x) === false);
    }

    case "greater-than": {
      const filterValue = Number(expression);
      return (x) => (x !== "" && x?.valueOf() > filterValue);
    }

    case "greater-than-or-equal": {
      const filterValue = Number(expression);
      return (x) => (x !== "" && x?.valueOf() >= filterValue);
    }

    case "less-than": {
      const filterValue = Number(expression);
      return (x) => (x !== "" && x?.valueOf() < filterValue);
    }

    case "less-than-or-equal": {
      const filterValue = Number(expression);
      return (x) => (x !== "" && x?.valueOf() <= filterValue);
    }

    case "between": {
      const [ from, to ] = expression.split(",");
      const minValue = Number(from);
      const maxValue = Number(to);
      return (x) => (x !== "" && x?.valueOf() >= minValue && x?.valueOf() <= maxValue);
    }

    case "not-between": {
      const [ from, to ] = expression.split(",");
      const minValue = Number(from);
      const maxValue = Number(to);
      return (x) => (x !== "" && x?.valueOf() < minValue || x?.valueOf() > maxValue);
    }

    case "regex": {
      const regexp = new RegExp(expression, caseSensetive ? undefined : "i");
      return (x) => (regexp.test(x) === true);
    }

    case "not-regex": {
      const regexp = new RegExp(expression, caseSensetive ? undefined : "i");
      return (x) => (regexp.test(x) === false);
    }

    case "is-number": {
      return (x) => (isNumber(x));
    }

    case "not-number": {
      return (x) => (!isNumber(x));
    }
    default:
      throw new Error(`Invalid filter operator: ${operator}`);
  }
};
