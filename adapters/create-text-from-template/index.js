const Mustache = require("mustache");

module.exports = function (args) {
  const view = {};

  for (const [ key, value ] of args.variables.entries()) {
    view[key] = value;
  }

  const text = Mustache.render(
    args.template,
    view,
  );

  return { text };
};

module.exports.manifest = require("./manifest.js");
