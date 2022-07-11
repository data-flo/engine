const { isValid } = require("date-fns");

module.exports = function createDate(value) {
  if (value instanceof Date) {
    return value;
  }
  const date = new Date(value);

  if (!isValid(date)) {
    throw new Error(`Cannot convert value '${value}' to date`);
  }

  return date;
};
