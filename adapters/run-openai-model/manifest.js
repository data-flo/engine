module.exports = {
  "description": "Runs an OpenAI language model.",
  "group": "Transform",
  "subgroup": "AI & Machine Learning",
  "input": [
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
      "description": "The system message helps set the behavior of the assistant (e.g. `You are a helpful assistant`).\nYou can modify the personality of the assistant or provide specific instructions about how it should behave throughout the conversation.\nSee https://platform.openai.com/docs/guides/gpt/chat-completions-api",
      "required": true,
    },
    {
      "name": "user message",
      "type": "text",
      "description": "The input of the model to run.",
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
      "name": "assistant message",
      "type": "text",
      "description": "The model prediction.",
    },
    {
      "name": "duration",
      "type": "text",
      "description": "The duration of the model run.",
    },
  ],
};
