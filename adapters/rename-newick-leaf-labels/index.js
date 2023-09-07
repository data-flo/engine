const escapeStringRegexp = require("escape-string-regexp");

module.exports = function (args) {
  let text = args.newick;
  for (const [ oldName, newName ] of args.mapping.entries()) {
    text = text.replace(
      new RegExp(
        `([(,])${escapeStringRegexp(oldName)}(:)`,
        "g",
      ),
      `$1${newName}$2`
    );
  }

  return { newick: text };
};

module.exports.manifest = require("./manifest.js");
