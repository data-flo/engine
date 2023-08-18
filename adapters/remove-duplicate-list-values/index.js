const CaseInsensitiveSet = require("../../utils/structures/case-insensitive-set");

module.exports = function (args) {
  const set = args["case sensitive"] ? new Set() : new CaseInsensitiveSet();
  const list = [];
  const duplicates = [];
  for (const value of args.list) {
    if (set.has(value)) {
      duplicates.push(value);
    }
    else {
      list.push(value);
      set.add(value);
    }
  }

  return {
    list,
    duplicates,
  };
};

module.exports.manifest = require("./manifest.js");
