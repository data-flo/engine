module.exports = {
  "description": "Runs a Replicate model.",
  "group": "Transform",
  "subgroup": "AI & Machine Learning",
  "input": [
    {
      "name": "model",
      "type": "text",
      "description": "The URL of the Replicate model to run, e.g. `stability-ai/stable-diffusion:db21e45d`.",
      "required": true,
    },
    {
      "name": "input",
      "type": "map",
      "description": "The input of the model to run.",
      "required": true,
    },
    {
      "name": "api token",
      "type": "text",
      "description": "Replicate API token found in https://replicate.com/account/api-tokens.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "outputs",
      "type": "list",
      "description": "The model predictions.",
    },
    {
      "name": "status",
      "type": "text",
      "description": "The status of the model run.",
    },
    {
      "name": "duration",
      "type": "text",
      "description": "The duration of the model run.",
    },
  ],
};
