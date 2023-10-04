function getExecutable(name) {
  const func = require(`../adapters/${name}/index.js`);
  return func;
}

module.exports = function getAdaptorExecutable(name) {
  const executable = getExecutable(name);
  executable.manifest.name = name;
  return executable;
};
