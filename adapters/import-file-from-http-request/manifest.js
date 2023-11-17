module.exports = {
  "description": "Imports a file from an HTTP request.",
  "group": "Import",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "The URL of the resource you want to fetch.",
      "required": true,
    },
    {
      "name": "method",
      "type": "text",
      "description": "The request method, e.g., `GET`, `POST`. The default is `GET`",
      "required": false,
      "default": "GET",
      "ui": { "can-be-one-of": [ "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS" ] },
    },
    {
      "name": "headers",
      "type": "dictionary",
      "description": "Any headers you want to add to the request.",
      "required": false,
    },
    {
      "name": "body",
      "type": "file",
      "description": "Any body that you want to add to the request.",
      "required": false,
    },
  ],
  "output": [
    {
      "name": "response body",
      "type": "file",
      "description": "The response body.",
    },
    {
      "name": "status code",
      "type": "number",
      "description": "The response status code.",
    },
    {
      "name": "response headers",
      "type": "dictionary",
      "description": "The response headers.",
    },
  ],
};
