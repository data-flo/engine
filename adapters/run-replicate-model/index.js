const Replicate = require("replicate");

// const toObject = require("cgps-stdlib/maps/to-object.js");

module.exports = async function (args) {
  const replicate = new Replicate({
    auth: args["api token"],
  });

  const startTime = performance.now();

  let lastPrediction;
  const handleProgress = (prediction) => {
    lastPrediction = prediction;
  };

  const outputs = await replicate.run(
    args.model,
    { input: Object.fromEntries(args.input) },
    handleProgress,
  );

  const endTime = performance.now();

  const duration = (endTime - startTime);

  return {
    outputs: Array.isArray(outputs) ? outputs : [outputs],
    status: lastPrediction.status,
    duration,
  };
};

module.exports.manifest = require("./manifest.js");
