module.exports = function (args) {
  const totalElements = args.list.length;

  if (args.begin === 0) {
    throw new Error("The position of the first row cannot be zero.");
  }

  if (args.end === 0) {
    throw new Error("The position of the last row cannot be zero.");
  }

  let firstRowNumber = args.begin;
  if (args.begin < 0) {
    firstRowNumber = totalElements + args.begin + 1;
  }

  let lastRowNumber = args.end;
  if (args.end < 0) {
    if (args.end === -1) {
      lastRowNumber = totalElements;
    }
    else {
      lastRowNumber = totalElements + args.end + 1;
    }
  }

  if (lastRowNumber < firstRowNumber) {
    throw new Error("The position of the last row should be greater than or equal to the position of the first row.");
  }

  const values = [];

  for (let index = 1; index <= args.list.length; index++) {
    if (index >= firstRowNumber && index <= lastRowNumber) {
      values.push(args.list[index - 1]);
    }
    if (!!args.limit && args.limit === values.length) {
      break;
    }
    if (index > lastRowNumber) {
      break;
    }
  }

  return {
    "list": values,
  };
};

module.exports.manifest = require("./manifest.js");
