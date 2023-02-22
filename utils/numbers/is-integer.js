import isNumber  from "./is-number";

export default function isInteger(n) {
  return isNumber(n) && Number.isInteger(parseFloat(n));
};
