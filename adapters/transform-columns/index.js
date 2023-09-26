const OpenAI = require("openai");

const runModel = require("../run-openai-model/utils/run-model.js");

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(args.columns);

  const openai = new OpenAI({
    apiKey: args["api token"],
  });

  const dict = new Map();

  const data = await args.data.transformAsync(
    async (row) => {
      for (const sourceColumn of args.columns) {
        if (typeof row[sourceColumn] === "string" && row[sourceColumn]) {
          const assistantMessage = await runModel(
            openai,
            args.model,
            args["system message"],
            row[sourceColumn],
          );
          dict.set(row[sourceColumn], assistantMessage);
          row[sourceColumn] = assistantMessage;
        }
      }
      return row;
    }
  );

  return {
    data,
    summary: dict,
  };
};

module.exports.manifest = require("./manifest.js");
