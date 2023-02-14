const Path = require("path");
const { URL } = require("url");
const { curly } = require("node-libcurl");
const contentDisposition = require("content-disposition");

const { EmptyObject } = require("../constants");

module.exports = async function (url) {
  const { statusCode, data, headers } = await curly(
    url,
    {
      curlyStreamResponse: true,
      FOLLOWLOCATION: true,
    },
  );

  const parsedUrlInfo = new URL(url);
  if (
    (parsedUrlInfo.protocol === "ftp:" && statusCode !== 150 /* File status okay */)
    ||
    (parsedUrlInfo.protocol === "http:" && statusCode !== 200 /* File status okay */)
    ||
    (parsedUrlInfo.protocol === "https:" && statusCode !== 200 /* File status okay */)
  ) {
    throw new Error(`Request status code ${statusCode}`);
  }

  const lastHeaders = headers.length ? headers[headers.length - 1] : EmptyObject;

  data.mediaType = lastHeaders["content-type"] || "application/octet-stream";

  if (lastHeaders["content-disposition"]) {
    const { parameters } = contentDisposition.parse(lastHeaders["content-disposition"]);
    data.name = parameters?.filename;
  }

  if (!data.name) {
    data.name = Path.basename(parsedUrlInfo.pathname) || "file";
  }

  return data;
};
