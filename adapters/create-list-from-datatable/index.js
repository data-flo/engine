class List {
  array = [];

  add(value) {
    this.array.push(value);
  }

  values() {
    return this.array;
  }
}

class UniqueList {
  set = new Set();

  add(value) {
    this.set.add(value);
  }

  values() {
    return Array.from(this.set);
  }
}

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(...args["column names"]);

  const list = args["unique values"] ? new UniqueList() : new List();

  for await (const row of args.data.getPartialReader(args["column names"])) {
    for (const columnName of args["column names"]) {
      const value = row[columnName];
      if (value !== null && value !== undefined && value !== "") {
        list.add(value);
      }
    }
  }

  return {
    list: list.values(),
  };
};

module.exports.manifest = require("./manifest.js");
