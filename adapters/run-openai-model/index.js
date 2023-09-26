const OpenAI = require("openai");

const runModel = require("./utils/run-model.js");

module.exports = async function (args) {
  const openai = new OpenAI({
    apiKey: args["api token"],
  });

  const startTime = performance.now();

  const assistantMessage = await runModel(
    openai,
    args.model,
    args["system message"],
    args["user message"],
  );

  const endTime = performance.now();

  const duration = (endTime - startTime);

  return {
    "assistant message": assistantMessage,
    duration,
  };
};

module.exports.manifest = require("./manifest.js");
