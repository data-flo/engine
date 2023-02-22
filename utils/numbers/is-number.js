/* eslint-disable no-restricted-globals */

export default function isNumber(n) {
  return (typeof n === "string" || typeof n === "number") && !isNaN(parseFloat(n)) && !isNaN(n - 0) && n !== "";
};
