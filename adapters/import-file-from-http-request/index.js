const axios = require("axios");

const { FileStream } = require("../../types/file.js");

module.exports = async function (args) {
  const response = await axios({
    "data": args.body,
    "headers": args.headers,
    "method": args.method,
    "url": args.url,
  });

  const response2 = await fetch(
    args.url,
    {
      "body": args.body ? args.body.getReader() : undefined,
      "headers": args.headers,
      "method": args.method,
    },
  );

  const headers = {};
  for (const [key, value] of response2.headers.entries()) {
    headers[key] = value;
  }

  const body = await FileStream.createFromStream(response2.body);

  return {
    "status code": response2.status,
    "response body": body,
    "response headers": headers,
  };
};

module.exports.manifest = require("./manifest.js");
