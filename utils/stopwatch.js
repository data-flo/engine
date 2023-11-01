const sums = {};
const counts = {};
const ticks = {};

module.exports.start = function (name) {
  ticks[name] = performance.now();
};

module.exports.stop = function (name) {
  sums[name] = (sums[name] ?? 0) + (performance.now() - ticks[name]);
  counts[name] = (counts[name] ?? 0) + 1;
};

module.exports.show = function (name) {
  console.debug("timer", name, { total: sums[name], count: counts[name], avg: sums[name] / counts[name] });
};

module.exports.reset = function (name) {
  sums[name] = 0;
  counts[name] = 0;
  ticks[name] = undefined;
};

module.exports.report = function () {
  for (const name of Object.keys(counts)) {
    module.exports.show(name);
  }
};
