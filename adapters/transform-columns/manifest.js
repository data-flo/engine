module.exports = {
  "description": "Transforms values in specified columns using an OpenAI language model.",
  "group": "Transform",
  "subgroup": "AI & Machine Learning",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the columns to be transformed.",
      "required": true,
    },
    {
      "name": "columns",
      "type": "list",
      "description": "The list of columns to be transformed.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "model",
      "type": "text",
      "description": "The name of the language models to run, see https://openai.com/pricing for price points of each model.\nIf unspecified, defaults to `gpt-3.5-turbo`.",
      "required": false,
      "default": "gpt-3.5-turbo",
      "ui": {
        "must-be-one-of": [ "gpt-3.5-turbo", "gpt-4", "gpt-3.5-turbo-16k" ],
      },
    },
    {
      "name": "system message",
      "type": "text",
      "description": "The system message helps set the behavior of the assistant.\nFor example, you can modify the personality of the assistant or provide specific instructions about how it should behave throughout the conversation.\nSee https://platform.openai.com/docs/guides/gpt/chat-completions-api",
      "required": true,
    },
    {
      "name": "api token",
      "type": "text",
      "description": "OpenAI API token found in https://platform.openai.com/account/api-keys.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the specified columns transformed.",
    },
    {
      "name": "summary",
      "type": "dictionary",
      "description": "A summary of the transformed values.",
    },
  ],
};
