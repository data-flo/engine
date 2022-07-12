const { URL } = require("node:url");
const request = require("request");

const requestStream = require("../../utils/request/stream");

module.exports = async function (args) {
  const url = new URL(args.url);

  if (url.protocol === "ftp:") {

  }

  if (url.protocol === "http:" || url.protocol === "https:") {
    const file = requestStream(args.url);
    return { file };
  }

};

module.exports.manifest = require("./manifest");
