const request = require("request");

module.exports = async function getStream(url, data) {
  return request(url, data);
};
