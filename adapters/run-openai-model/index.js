const OpenAI = require("openai");

// const toObject = require("cgps-stdlib/maps/to-object.js");

module.exports = async function (args) {
  const openai = new OpenAI({
    apiKey: args["api token"],
  });

  const startTime = performance.now();

  const outputs = await openai.chat.completions.create({
    model: args.model || "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": args["system"]
      },
      {
        "role": "user",
        "content": args["user"]
      }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const endTime = performance.now();

  const duration = (endTime - startTime);

  const messages = [];
  for (const choice of outputs.choices) {
    messages.push(choice.message.content)
  }

  return {
    outputs: messages,
    duration,
  };
};

module.exports.manifest = require("./manifest.js");
