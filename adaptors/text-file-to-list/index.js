const { parse } = require("csv");

module.exports = async function (args) {
  const list = [];

  const iterator = args.file.getReader({ encoding: args.encoding })
    .pipe(
      parse({
        columns: false,
        delimiter: args.separator,
        trim: args.trim,
        quote: null,
      })
    );

  for await (const item of iterator) {
    list.push(item);
  }

  return {
    list,
  };
};

module.exports.manifest = require("./manifest");
