const OpenAI = require("openai");

// const toObject = require("cgps-stdlib/maps/to-object.js");

module.exports = async function (args) {
  const openai = new OpenAI({
    apiKey: args["api token"],
  });

  const startTime = performance.now();

  const outputs = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: ["She no went to the market."],
    temperature: 0,
    max_tokens: 256,
  });

  const endTime = performance.now();

  const duration = (endTime - startTime);

  console.log({outputs})

  return {
    outputs: Array.isArray(outputs) ? outputs : [outputs],
    // status: lastPrediction.status,
    duration,
  };
};

module.exports.manifest = require("./manifest.js");
